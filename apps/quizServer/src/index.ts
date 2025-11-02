import express, { json } from "express";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import { generateQuiz } from "./ai/aiQueries.js";
import { quizInput, QuizQuestionType, QuizResponse } from "@repo/common"
import { WebSocketServer } from "ws";


interface Player {
    userId: String;
    username: string;
    ws: any;
    score: number;
    streak: number;
    currentAnswer: number | null;
    answeredAt: number | null;
}

interface Room {
    roomCode: string,
    quizId: string,
    questions: QuizQuestionType[];
    hostId: string,
    players: Map<string, Player>
    currentQuestionIndex: number,
    isActive: boolean,
    timerStartedAt: number,
    timePerQuestion: number,
}


const app = express();
app.use(express.json());
app.use(cors())




app.get("/api/healthcheck", (req, res) => {
    console.log(process.env.PORT);
    res.send("hello world")
})



app.post("/api/ai/quiz", async (req, res) => {
    try {
        const { success } = quizInput.safeParse(req.body);
        if (!success) {
            return res.status(400).json("Invalid input data format");
        }
        const { prompt } = req.body;

        const aiResponse = await generateQuiz(prompt);

        const quizData = aiResponse?.choices[0]?.message.content as string;
        const quiz = JSON.parse(quizData);
        const parseResult = QuizResponse.safeParse(quiz);

        if (!parseResult?.success || parseResult.data.quiz.length == 0) {
            return res.status(503).json("Error while genrating the Quiz");
        }
        return res.status(200).json(quiz)
    } catch (error) {
        console.log(error);
        return res.status(503).json("Error while genrating the Quiz")
    }
});

app.post("/api/rooms/create", (req, res) => {
    try {
        const { questions, quizId, userId } = req.body;

        const roomCode = generateRoomCode();

        const room: Room = {
            roomCode,
            quizId,
            hostId: userId,
            players: new Map(),
            questions,
            currentQuestionIndex: 0,
            isActive: false,
            timerStartedAt: 0,
            timePerQuestion: 30
        }

        rooms.set(roomCode, room);

        return res.status(200).json({
            success: true,
            roomCode,
            message: "Room created successfully"
        });

    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ error: "Failed to create room" });
    }

})




const port = process.env.PORT;

const httpServer = app.listen(port, () => {
    console.log(`listening on port ${port}`);

})



const wss = new WebSocketServer({ server: httpServer });




const rooms = new Map<string, Room>();


function generateRoomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return code;
}

function broadcastToRoom(roomCode: string, message: any) {
    const room = rooms.get(roomCode);
    if (!room) return;

    const payload = JSON.stringify(message);

    room.players.forEach((player) => {
        player.ws.send(payload);
    })
}


function handleJoinRoom(ws: any, roomCode: string, userId: string, username: string) {
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

    const player: Player = {
        userId,
        username,
        ws,
        score: 0,
        streak: 0,
        currentAnswer: null,
        answeredAt: null
    }


    room.players.set(userId, player);

    console.log(`${username} joined room ${roomCode}`);

    ws.send(JSON.stringify({
        type: "join_success",
        roomCode,
        playerCount: room.players.size
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


function handleStartQuiz(ws: any, roomCode: string, userId: string) {
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



function handleSubmitAnswer(ws: any, roomCode: string, userId: string, answerIndex: number) {
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

    const leaderboard = Array.from(room.players.values())
        .sort((a, b) => b.score - a.score)
        .map((p, index) => ({
            rank: index + 1,
            username: p.username,
            score: p.score,
            answered: p.currentAnswer !== null
        }));

    broadcastToRoom(roomCode, {
        type: "leaderboard_updated",
        leaderboard
    })
}


function scheduleNextQuestionAutoAdvance(roomCode: string, delayMs: number) {
    setTimeout(() => {
        const room = rooms.get(roomCode);
        if (!room || !room.isActive) return;

        // Automatically advance to next question
        handleNextQuestionAuto(roomCode);
    }, delayMs);
}


function handleNextQuestionAuto(roomCode: string) {
    const room = rooms.get(roomCode);
    if (!room) return;

    const currentQuestion = room.questions[room.currentQuestionIndex];
    const correctAnswerIndex = currentQuestion?.options.indexOf(currentQuestion.answer);

    console.log(`AUTO: Scoring Q${room.currentQuestionIndex + 1}`);

    room.players.forEach((player) => {
        if (player.currentAnswer === correctAnswerIndex) {
            player.score += 10;
            player.streak += 1;

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
            streak: p.streak
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

        // TODO: Save results to database

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





wss.on("connection", (ws) => {
    console.log("New client connected to WebSocket");

    ws.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            const { type, roomCode, userId, username, answerIndex } = message;

            if (type === "join_room") {
                handleJoinRoom(ws, roomCode, userId, username);
            }

            if (type === "start_quiz") {
                handleStartQuiz(ws, roomCode, userId);
            }

            if (type === "submit_answer") {
                handleSubmitAnswer(ws, roomCode, userId, answerIndex);
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }

    });


    ws.on("close", () => {
        console.log("client disconnected")
    })

})


