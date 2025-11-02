"use client";
import React, {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCompete } from "./competeContext";
import { useRouter } from "next/navigation";

type WebSocketContextType = {
  send: (message: any) => void;
  on: (type: string, handler: (data: any) => void) => void;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const {
    username,
    roomCode,
    setRoomCode,
    setCurrentQuestion,
    setAnswered,
    setPlayers,
    setLeaderboard,
    setCorrectAnswerIndex,
    setShowingResults,
    setFinalLeaderboard,
    setUserRank,
    setUserScore,
  } = useCompete();

  const ws = useRef<WebSocket | null>(null);
  const handlers = useRef<Map<string, (data: any) => void>>(new Map());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_SERVER_BASE_URL || "ws://localhost:5000";

    if (!ws.current) {
      ws.current = new WebSocket(wsUrl);
    }

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const handler = handlers.current.get(message.type);
        if (handler) handler(message);
      } catch (error) {
        console.log("Failed to parse WebSocket message:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket error:", error);
      setIsConnected(false);
    };

    return () => {
      console.log("WebSocketProvider unmounted");
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    const handleJoinSuccess = (data: any) => {
      console.log("Successfully joined room:", data.roomCode);
      setRoomCode(data.roomCode);

      router.push(`/lobby/${data.roomCode}`);
    };

    const handleError = (data: any) => {
      console.log("Error:", data.message);
    };

    const handlePlayersUpdated = (data: any) => {
      console.log("Players updated:", data.players);
      setPlayers(data.players);
    };

    const handleAnswerReceived = (data: any) => {
      console.log("Answer submitted:", data.timeToAnswer);
      setAnswered(true);
    };

    const handlePlayerAnswered = (data: any) => {
      console.log(`${data.username} answered in ${data.answeredAt}s`);
      // You could show a notification or list of who answered
      // For now, just log it
    };

    const handleLeaderboardUpdated = (data: any) => {
      console.log("Leaderboard updated:", data.leaderboard);
      setLeaderboard(data.leaderboard);
    };

    const handleQuestionResults = (data: any) => {
      console.log("Correct answer:", data.correctAnswerIndex);

      setCorrectAnswerIndex(data.correctAnswerIndex);
      setShowingResults(true);

    };

    const handleQuizStarted = (data: any) => {
      console.log("Quiz started!");
    };

    const handleNewQuestion = (data: any) => {
      console.log("New question received:", data.questionIndex);
      console.log("handleNewQuestion");
      const question = {
        questionIndex: data.questionIndex,
        totalQuestions: data.totalQuestions,
        question: data.question,
        options: data.options,
        timeLimit: data.timeLimit,
        serverTime: data.serverTime,
      };

      setCurrentQuestion(question);
      setAnswered(false);

    };

    const handleQuizEnded = (data: any) => {
      console.log("Quiz ended!");
      console.log("Final leaderboard:", data.finalLeaderboard);

      setFinalLeaderboard(data.finalLeaderboard);

      const userEntry = data.finalLeaderboard.find(
        (entry: any) => entry.username === username
      );

      if (userEntry) {
        setUserRank(userEntry.rank);
        setUserScore(userEntry.score);
      }

      setTimeout(() => {
        router.push(`/results/${roomCode}`);
      }, 2000);
    };

    on("quiz_started", handleQuizStarted);
    on("new_question", handleNewQuestion);
    on("quiz_ended", handleQuizEnded);

    on("answer_received", handleAnswerReceived);
    on("player_answered", handlePlayerAnswered);
    on("leaderboard_updated", handleLeaderboardUpdated);
    on("question_results", handleQuestionResults);

    on("players_updated", handlePlayersUpdated);

    on("join_success", handleJoinSuccess);
    on("error", handleError);
  }, [roomCode, router, setAnswered, setCorrectAnswerIndex, setCurrentQuestion, setFinalLeaderboard, setLeaderboard, setPlayers, setRoomCode, setShowingResults, setUserRank, setUserScore, username]);

  const send = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  const on = (type: string, handler: (data: any) => void) => {
    handlers.current.set(type, handler);
  };

  return (
    <WebSocketContext.Provider value={{ send, isConnected,on }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook to use WebSocket anywhere
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used inside a WebSocketProvider");
  }
  return context;
};
