"use client";

import { createContext, useReducer, Dispatch, useEffect } from "react";

interface QuizState {
  quizId: number;
  questionCount: number;
  correctCount: number;
}

type QuizAction =
  | {
      type: "SET_DATA";
      payload: { quizId: number; questionCount: number; correctCount: number };
    }
  | { type: "RESET" };

export interface QuizContextType {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        quizId: action.payload.quizId,
        questionCount: action.payload.questionCount,
        correctCount: action.payload.correctCount,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const initialState: QuizState = {
  quizId: 0,
  questionCount: 10,
  correctCount: 0,
};

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    console.log("Quiz Provider mounted");
    return () => {
      console.log("Quiz Provider unmounted");
    };
  }, []);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
