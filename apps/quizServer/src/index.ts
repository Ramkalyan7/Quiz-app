import express from "express";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
import { generateQuiz } from "./ai/aiQueries.js";
import { quizInput, QuizResponse } from "@repo/common"




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




const port = process.env.PORT;

app.listen(port, () => {
    console.log(`listening on port ${port}`);

})