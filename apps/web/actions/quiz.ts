"use server"

import axios from "axios"
import { prisma } from "../lib/prisma";
import { QuizResponseType } from "@repo/common";


const AIServerBaseUrl = "http://localhost:4000/api"

export const generateAndStoreQuiz = async (prompt: string) => {
    try {
        //get the quiz
        const response = await axios.post(`${AIServerBaseUrl}/ai/quiz`, { prompt });
        console.log("response")

        const data: QuizResponseType = response.data;
        console.log("data")

        const dbResponse = await prisma.quiz.create({
            data: {
                title: data.summary,
                quizData: JSON.stringify(data.quiz),
                tags: data.tags,

            }
        })

        if (dbResponse) {
            return { success: true, quizId: dbResponse.id };
        }

    } catch (e) {
        console.log(e)
        return { success: false, quizId: null };
    }
}