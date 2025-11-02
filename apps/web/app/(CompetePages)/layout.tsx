"use client";
import SideBar from "../../components/SideBar";
import { CompeteProvider } from "../../context/competeContext";
import { QuizProvider } from "../../context/quizContext";
import { useWebSocket, WebSocketProvider } from "../../context/socketContex";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row bg-slate-100">
      <SideBar />
      <QuizProvider>
        <CompeteProvider>
          <WebSocketProvider>
            <div className="pt-20 w-full">{children}</div>
          </WebSocketProvider>
        </CompeteProvider>
      </QuizProvider>
    </div>
  );
}
