"use server"

import { getServerSession } from "next-auth";
import { prisma } from "../lib/prisma";
import { authOptions } from "../lib/auth";

const updateQuizResult = async (quizId: number, score: number, totalScore: number) => {

    const session = await getServerSession(authOptions);
    if (!session) return;


    try {
        const quizAttempt = await prisma.quizAttempt.create(
            {
                data: {
                    userId: Number(session.user.id),
                    quizId: quizId,
                    totalScore: totalScore,
                    score: score,
                }

            }
        )

        if (!quizAttempt) {
            console.log("update quiz result error")
        } else {
            console.log("update quiz result success")
        }

    } catch (error) {
        console.log("update quiz result", error);
    }

}


export default updateQuizResult;