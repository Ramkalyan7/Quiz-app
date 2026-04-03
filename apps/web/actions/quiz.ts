"use server"

import axios, { isAxiosError } from "axios"
import { prisma } from "../lib/prisma";
import { QuizQuestionType, QuizResponseType } from "@repo/common";


const AIServerBaseUrl = process.env.AI_SERVER_BASE_URL;


const apiClient = axios.create({
    baseURL: AIServerBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export const generateAndStoreQuiz = async (prompt: string) => {
    try {
        //get the quiz
        const response = await apiClient.post("/ai/quiz", { prompt });
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
            return { success: true, quizId: dbResponse.id, data: dbResponse };
        }

    } catch (error) {
        console.error("Failed to create AI quiz:", error);
        let errorMessage = "Failed to create quiz";
        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message;
        }
        return {
            success: false,
            error: errorMessage,
        };
    }
}


export async function createRoom(quizId: string, questions: any[], userId: string) {
    try {
        const response = await apiClient.post("/rooms/create", {
            quizId,
            questions,
            userId,
        });
        return { success: true, roomCode: response.data.roomCode };
    } catch (error: any) {
        console.error("Failed to create room:", error);
        return {
            success: false,
            error: error.response?.data?.message || "Failed to create room",
        };
    }
}

export async function createRoomFromExistingQuiz(quizId: string, userId: string) {
    try {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: Number(quizId),
            },
            select: {
                id: true,
                quizData: true,
            }
        });

        if (!quiz) {
            return {
                success: false,
                error: "Quiz not found",
            };
        }

        let questions: QuizQuestionType[];

        if (typeof quiz.quizData === "string") {
            questions = JSON.parse(quiz.quizData) as QuizQuestionType[];
        } else {
            return {
                success: false,
                error: "Stored quiz data is invalid",
            };
        }

        if (questions.length === 0) {
            return {
                success: false,
                error: "Quiz has no questions",
            };
        }

        return await createRoom(quiz.id.toString(), questions, userId);
    } catch (error) {
        console.error("Failed to create room from existing quiz:", error);
        return {
            success: false,
            error: "Failed to create room",
        };
    }
}
