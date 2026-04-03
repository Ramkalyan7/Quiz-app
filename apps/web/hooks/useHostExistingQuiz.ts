import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createRoomFromExistingQuiz } from "../actions/quiz";
import { useCompete } from "../context/competeContext";
import { useWebSocket } from "../context/socketContex";

export function useHostExistingQuiz() {
  const [loadingQuizId, setLoadingQuizId] = useState<number | null>(null);
  const session = useSession();
  const router = useRouter();
  const { send } = useWebSocket();
  const { loading, reset, setLoading, setUserId, setUsername, setIsHost } =
    useCompete();

  useEffect(() => {
    if (!loading) {
      setLoadingQuizId(null);
    }
  }, [loading]);

  const hostQuiz = useCallback(
    async (quizId: number) => {
      const userId = session.data?.user.id;
      const username = session.data?.user.name || "Host";

      if (!userId) {
        toast.error("Please sign in to host a quiz");
        router.push("/login");
        return;
      }

      reset();
      setLoading(true);
      setLoadingQuizId(quizId);

      try {
        const roomResult = await createRoomFromExistingQuiz(
          quizId.toString(),
          userId
        );

        if (!roomResult.success) {
          toast.error(roomResult.error || "Failed to create room");
          setLoading(false);
          setLoadingQuizId(null);
          return;
        }

        setUserId(userId);
        setUsername(username);
        setIsHost(true);

        send({
          type: "join_room",
          roomCode: roomResult.roomCode,
          userId,
          username,
        });
      } catch (error) {
        console.error("Error hosting existing quiz:", error);
        toast.error("Failed to host quiz");
        setLoading(false);
        setLoadingQuizId(null);
      }
    },
    [
      reset,
      router,
      send,
      session.data?.user.id,
      session.data?.user.name,
      setIsHost,
      setLoading,
      setUserId,
      setUsername,
    ]
  );

  return {
    hostQuiz,
    loadingQuizId,
  };
}
