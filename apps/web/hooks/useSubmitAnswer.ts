import { useCallback } from "react";
import { useCompete } from "../context/competeContext";
import { useWebSocket } from "../context/socketContex";

export function useSubmitAnswer() {
  const { send } = useWebSocket();
  const {
    userId,
    roomCode,
    setLoading
  } = useCompete();



  const submitAnswer = useCallback(
    (answerIndex: number) => {
      setLoading(true)
      if (!userId || !roomCode) {
        console.error("Missing userId or roomCode");
        setLoading(false)
        return;
      }

      console.log("Submitting answer:", answerIndex);

      send({
        type: "submit_answer",
        roomCode,
        userId,
        answerIndex,
      });
    },
    [setLoading, userId, roomCode, send]
  );

  return { submitAnswer };
}
