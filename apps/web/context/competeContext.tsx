"use client";

import { createContext, useContext, useState } from "react";

interface Player {
  userId: string;
  username: string;
  score: number;
}

interface Question {
  questionIndex: number;
  totalQuestions: number;
  question: string;
  options: string[];
  timeLimit: number;
  serverTime: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  streak?: number;
  maxStreak?: number;
  answered?: boolean;
}

interface CompeteContextType {
  // User info
  userId: string | null;
  setUserId: (id: string | null) => void;

  username: string | null;
  setUsername: (name: string | null) => void;

  // Room info
  roomCode: string | null;
  setRoomCode: (code: string | null) => void;

  isHost: boolean;
  setIsHost: (host: boolean) => void;

  // Quiz state
  currentQuestion: Question | null;
  setCurrentQuestion: (q: Question | null) => void;

  answered: boolean;
  setAnswered: (answered: boolean) => void;

  // Live data
  players: Player[];
  setPlayers: (players: Player[]) => void;

  leaderboard: LeaderboardEntry[];
  setLeaderboard: (lb: LeaderboardEntry[]) => void;

  // Question results
  correctAnswerIndex: number | null;
  setCorrectAnswerIndex: (index: number | null) => void;

  // Results
  finalLeaderboard: LeaderboardEntry[];
  setFinalLeaderboard: (lb: LeaderboardEntry[]) => void;

  userRank: number | null;
  setUserRank: (rank: number | null) => void;

  userScore: number | null;
  setUserScore: (score: number | null) => void;

  quizTitle: string | null;
  setQuizTitle: (title: string | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Reset all state
  reset: () => void;
}

const competeContext = createContext<CompeteContextType | undefined>(undefined);

export function CompeteProvider({ children }: { children: React.ReactNode }) {
  // User info
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Room info
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);

  // Live data
  const [players, setPlayers] = useState<Player[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Question results
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );

  // Results state
  const [finalLeaderboard, setFinalLeaderboard] = useState<LeaderboardEntry[]>(
    []
  );
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number | null>(null);
  const [quizTitle, setQuizTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🧹 Reset function
  const reset = () => {
    setUserId(null);
    setUsername(null);
    setRoomCode(null);
    setIsHost(false);
    setCurrentQuestion(null);
    setAnswered(false);
    setPlayers([]);
    setLeaderboard([]);
    setCorrectAnswerIndex(null);
    setFinalLeaderboard([]);
    setUserRank(null);
    setUserScore(null);
    setQuizTitle(null);
    setLoading(false);
  };

  return (
    <competeContext.Provider
      value={{
        userId,
        setUserId,
        username,
        setUsername,
        roomCode,
        setRoomCode,
        isHost,
        setIsHost,
        currentQuestion,
        setCurrentQuestion,
        answered,
        setAnswered,
        players,
        setPlayers,
        leaderboard,
        setLeaderboard,
        correctAnswerIndex,
        setCorrectAnswerIndex,
        finalLeaderboard,
        setFinalLeaderboard,
        userRank,
        setUserRank,
        userScore,
        setUserScore,
        quizTitle,
        setQuizTitle,
        loading,
        setLoading,
        reset, // 👈 Added here
      }}
    >
      {children}
    </competeContext.Provider>
  );
}

export function useCompete() {
  const context = useContext(competeContext);
  if (!context) {
    throw new Error("useCompete must be used within CompeteProvider");
  }
  return context;
}
