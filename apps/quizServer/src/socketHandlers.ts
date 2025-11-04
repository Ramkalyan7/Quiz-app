import { Player } from "./types.js";
import { rooms } from "./index.js";

export function broadcastToRoom(roomCode: string, message: any) {
    const room = rooms.get(roomCode);
    if (!room) return;

    const payload = JSON.stringify(message);

    room.players.forEach((player) => {
        player.ws.send(payload);
    })
}


export function handleJoinRoom(ws: any, roomCode: string, userId: string, username: string) {
    const room = rooms.get(roomCode);


    if (!room) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Room not found"
        }))
        return;
    }

    if (room.isActive) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Quiz already started"
        }));
        return;
    }

    if (room.players.size == 10) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Only 5 Players Can Participate in a Quiz"
        }));
        return;
    }

    const player: Player = {
        userId,
        username,
        ws,
        score: 0,
        streak: 0,
        maxStreak: 0,
        currentAnswer: null,
        answeredAt: null
    }


    room.players.set(userId, player);

    console.log(`${username} joined room ${roomCode}`);

    ws.send(JSON.stringify({
        type: "join_success",
        roomCode,
        playerCount: room.players.size,
        quiz: room.questions
    }));

    broadcastToRoom(roomCode, {
        type: "players_updated",
        players: Array.from(room.players.values()).map((p) => {
            return {
                userId: p.userId,
                username: p.username,
                score: p.score
            }
        }),
        count: room.players.size
    })
}


export function handleStartQuiz(ws: any, roomCode: string, userId: string) {
    const room = rooms.get(roomCode);

    if (!room) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Room not found"
        }));
        return;
    }

    if (room.hostId !== userId) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Only host can start quiz"
        }));
        return;
    }

    room.isActive = true;
    room.timerStartedAt = Date.now();
    room.currentQuestionIndex = 0;

    console.log(`Quiz started in room ${roomCode}`);

    broadcastToRoom(roomCode, {
        type: "quiz_started",
        roomCode,
        message: "Quiz has started!"
    });

    const currentQuestion = room.questions[0];

    broadcastToRoom(roomCode, {
        type: "new_question",
        questionIndex: 1,
        totalQuestions: room.questions.length,
        question: currentQuestion?.question,
        options: currentQuestion?.options,
        timeLimit: room.timePerQuestion,
        serverTime: room.timerStartedAt
    });

    scheduleNextQuestionAutoAdvance(roomCode, room.timePerQuestion * 1000);
}



export function handleSubmitAnswer(ws: any, roomCode: string, userId: string, answerIndex: number) {
    const room = rooms.get(roomCode);

    if (!room) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Room not found"
        }));
        return;
    }

    const player = room.players.get(userId);

    if (!player) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Player not in room"
        }))
        return;
    }


    if (!room.isActive) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Quiz not active"
        }));
        return;
    }


    const now = Date.now();
    const questionElapsedTime = (now - room.timerStartedAt) / 1000;

    if (questionElapsedTime > room.timePerQuestion) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Time's up!",
            rejected: true
        }));
        return;
    }

    if (player.currentAnswer !== null) {
        ws.send(JSON.stringify({
            type: "error",
            message: "You already answered this question",
            rejected: true
        }));
        return;
    }

    if (answerIndex < 0 || answerIndex > 3) {
        ws.send(JSON.stringify({
            type: "error",
            message: "Invalid answer",
            rejected: true
        }));
        return;
    }

    player.currentAnswer = answerIndex;
    player.answeredAt = questionElapsedTime;

    console.log(`${player.username} answered in ${questionElapsedTime.toFixed(2)}s`);

    ws.send(JSON.stringify({
        type: "answer_received",
        message: "Answer submitted!",
        timeToAnswer: questionElapsedTime.toFixed(2)
    }));

    broadcastToRoom(roomCode, {
        type: "player_answered",
        username: player.username,
        userId,
        answeredAt: questionElapsedTime.toFixed(2)
    });

}


export function scheduleNextQuestionAutoAdvance(roomCode: string, delayMs: number) {
    setTimeout(() => {
        const room = rooms.get(roomCode);
        if (!room || !room.isActive) return;

        // Automatically advance to next question
        handleNextQuestionAuto(roomCode);
    }, delayMs);
}


export function handleNextQuestionAuto(roomCode: string) {
    const room = rooms.get(roomCode);
    if (!room) return;

    const currentQuestion = room.questions[room.currentQuestionIndex];
    const correctAnswerIndex = currentQuestion?.options.indexOf(currentQuestion.answer);

    console.log(`AUTO: Scoring Q${room.currentQuestionIndex + 1}`);

    room.players.forEach((player) => {
        if (player.currentAnswer === correctAnswerIndex) {
            player.score += 10;
            player.streak += 1;
            if (player.streak > player.maxStreak) {
                player.maxStreak = player.streak;
            }

        } else {
            player.streak = 0;
        }

        player.currentAnswer = null;
        player.answeredAt = null;
    });


    broadcastToRoom(roomCode, {
        type: "question_results",
        correctAnswerIndex,
        correctAnswerText: currentQuestion?.answer,
        explanation: currentQuestion?.explanation
    });

    const leaderboard = Array.from(room.players.values())
        .sort((a, b) => b.score - a.score)
        .map((p, index) => ({
            rank: index + 1,
            username: p.username,
            score: p.score,
            streak: p.streak,
            maxStreak: p.maxStreak
        }));

    broadcastToRoom(roomCode, {
        type: "leaderboard_updated",
        leaderboard
    });

    room.currentQuestionIndex += 1;


    if (room.currentQuestionIndex >= room.questions.length) {
        room.isActive = false;

        console.log(`Quiz auto-ended in room ${roomCode}`);

        broadcastToRoom(roomCode, {
            type: "quiz_ended",
            finalLeaderboard: leaderboard,
            message: "Quiz complete!"
        });


        setTimeout(() => {
            rooms.delete(roomCode);
            console.log(`Room ${roomCode} cleaned up`);
        }, 5000);

        return;
    }

    // Send next question
    room.timerStartedAt = Date.now();
    const nextQuestion = room.questions[room.currentQuestionIndex];

    broadcastToRoom(roomCode, {
        type: "new_question",
        questionIndex: room.currentQuestionIndex + 1,
        totalQuestions: room.questions.length,
        question: nextQuestion?.question,
        options: nextQuestion?.options,
        timeLimit: room.timePerQuestion,
        serverTime: room.timerStartedAt
    });

    console.log(`Q${room.currentQuestionIndex + 1} auto-sent to room ${roomCode}`);

    // Schedule next auto-advance
    scheduleNextQuestionAutoAdvance(roomCode, room.timePerQuestion * 1000);

}


