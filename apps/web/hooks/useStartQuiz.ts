import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCompete } from "../context/competeContext";
import { useWebSocket } from "../context/socketContex";

export function useStartQuiz() {
    const { send } = useWebSocket();
    const { userId,
        roomCode,
        username,
        setCurrentQuestion,
        setAnswered,
        setFinalLeaderboard,
        setUserRank,
        setUserScore, } = useCompete();
    const router = useRouter();


    const startQuiz = useCallback(() => {
        if (!userId || !roomCode) {
            console.error("Missing userId or roomCode");
            return;
        }

        console.log("Starting quiz...");

        send({
            type: "start_quiz",
            roomCode,
            userId,
        });
    }, [send, userId, roomCode]);

    return { startQuiz };
}
