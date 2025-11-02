import { useCallback } from "react";
import { useCompete } from "../context/competeContext";
import { useWebSocket } from "../context/socketContex";

export function useSubmitAnswer() {
  const { send } = useWebSocket();
  const {
    userId,
    roomCode,
    setAnswered,
    setLeaderboard,
    setCorrectAnswerIndex,
    setShowingResults,
  } = useCompete();

 

  const submitAnswer = useCallback(
    (answerIndex: number) => {
      if (!userId || !roomCode) {
        console.error("Missing userId or roomCode");
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
    [send, userId, roomCode]
  );

  return { submitAnswer };
}
