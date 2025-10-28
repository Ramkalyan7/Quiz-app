import { z } from "zod";

export const quizInput = z.object({
    prompt: z.string().min(1).max(500)
})

export const QuizQuestion = z.object({
    question: z.string(),
    options: z.array(z.string()).max(4),
    answer: z.string(),
    explanation: z.string(),
})

export const QuizResponse = z.object({
    quiz: z.array(QuizQuestion),
    tags: z.array(z.string()),
    summary: z.string(),
})

export type QuizInputType = z.infer<typeof quizInput>;
export type QuizQuestionType = z.infer<typeof QuizQuestion>;
export type QuizResponseType = z.infer<typeof QuizResponse>;

