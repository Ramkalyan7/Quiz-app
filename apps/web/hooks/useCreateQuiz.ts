import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompete } from "../context/competeContext";
import { createRoom, generateAndStoreQuiz } from "../actions/quiz";
import { QuizQuestionType } from "@repo/common";
import { useSession } from "next-auth/react";
import { useWebSocket } from "../context/socketContex";

export function useCreateQuiz() {
    const session = useSession();
    const [error, setError] = useState("");

    const { send } = useWebSocket();
    const {  setUserId, setUsername, setIsHost,loading,setLoading ,reset} = useCompete();
    const router = useRouter();

   

    const createQuiz = useCallback(
        async (prompt: string, username: string) => {
            reset()
            setLoading(true);
            setError("");

            try {

                console.log("Generating quiz with prompt:", prompt);
                const quizResult = await generateAndStoreQuiz(prompt);

                if (!quizResult?.success) {
                    setError(quizResult?.error as string);
                    setLoading(false);
                    return;
                }

                const quiz = quizResult.data;

                let questions: QuizQuestionType[];

                if (typeof quiz?.quizData === "string") {
                    const temp = quiz.quizData as string;
                    questions = JSON.parse(temp) as QuizQuestionType[];
                } else {
                    questions = []
                    router.push("/")
                }

                console.log(`Generated ${questions?.length} questions`);

                const userId =session.data?.user.id;

                console.log("Creating room...");
                const roomResult = await createRoom(
                   quizResult.quizId?.toString()||"",
                    questions,
                    userId||""
                );

                if (!roomResult.success) {
                    setError(roomResult.error);
                    setLoading(false);
                    return;
                }

                const roomCode = roomResult.roomCode;

                // Step 3: Store user info
                setUserId(userId||"");
                setUsername(username);
                setIsHost(true);

                // Step 4: Join room via WebSocket
                console.log("Joining room as host...");
                send({
                    type: "join_room",
                    roomCode,
                    userId,
                    username,
                });
            } catch (err: any) {
                console.error("Error creating quiz:", err);
                setError(err.message || "Failed to create quiz");
                setLoading(false);
            }
        },
        [setLoading, session.data?.user.id, setUserId, setUsername, setIsHost, send, router]
    );

    return { createQuiz, error, loading };
}
