import { useEffect, useState } from "react";
import { useCompete } from "../context/competeContext";

export function useQuestionTimer() {
  const { currentQuestion } = useCompete();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!currentQuestion) return;

    const calculateTimeLeft = () => {
      const elapsed = (Date.now() - currentQuestion.serverTime) / 1000;
      const remaining = currentQuestion.timeLimit - elapsed;
      return Math.max(0, Math.ceil(remaining));
    };

   
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  return { timeLeft };
}
