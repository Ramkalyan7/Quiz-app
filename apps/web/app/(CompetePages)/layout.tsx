"use client";
import SideBar from "../../components/SideBar";
import { CompeteProvider } from "../../context/competeContext";
import { QuizProvider } from "../../context/quizContext";
import { WebSocketProvider } from "../../context/socketContex";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row bg-slate-100">
      <SideBar />
      <div className="w-full">{children}</div>
    </div>
  );
}
