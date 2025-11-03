import { useCallback } from "react";
import { useCompete } from "../context/competeContext";
import { useWebSocket } from "../context/socketContex";

export function useStartQuiz() {
    const { send } = useWebSocket();
    const { userId,
        roomCode,
        setLoading
    } = useCompete();


    const startQuiz = useCallback(() => {
        setLoading(true)
        if (!userId || !roomCode) {
            console.error("Missing userId or roomCode");
            setLoading(false)
            return;
        }

        console.log("Starting quiz...");

        send({
            type: "start_quiz",
            roomCode,
            userId,
        });
    }, [setLoading, userId, roomCode, send]);

    return { startQuiz };
}
