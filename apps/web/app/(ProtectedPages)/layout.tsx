import SideBar from "../../components/SideBar";
import { QuizProvider } from "../../context/quizContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row bg-linear-to-br from-green-50 via-emerald-50 to-teal-50">
      <SideBar />
      <div className="pt-20 w-full">{children}</div>
    </div>
  );
}
