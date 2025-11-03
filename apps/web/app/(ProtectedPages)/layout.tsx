import SideBar from "../../components/SideBar";
import { QuizProvider } from "../../context/quizContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row bg-slate-100">
      <SideBar />
      <div className="pt-20 w-full">{children}</div>
    </div>
  );
}
