"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { CompeteProvider } from "../context/competeContext";
import { QuizProvider } from "../context/quizContext";
import { WebSocketProvider } from "../context/socketContex";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QuizProvider>
        <CompeteProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </CompeteProvider>
      </QuizProvider>
    </SessionProvider>
  );
}
