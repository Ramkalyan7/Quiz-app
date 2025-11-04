import { QuizQuestionType } from "@repo/common";

export interface Player {
    userId: String;
    username: string;
    ws: any;
    score: number;
    streak: number;
    maxStreak: number;
    currentAnswer: number | null;
    answeredAt: number | null;
}

export interface Room {
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