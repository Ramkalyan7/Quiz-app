import express, { json } from "express";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import { generateQuiz } from "./ai/aiQueries.js";
import { quizInput, QuizResponse } from "@repo/common"
import { WebSocketServer } from "ws";
import { handleJoinRoom, handleStartQuiz, handleSubmitAnswer } from "./socketHandlers.js";
import { Room } from "./types.js";





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
            timePerQuestion: 10
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




export const rooms = new Map<string, Room>();


function generateRoomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return code;
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


