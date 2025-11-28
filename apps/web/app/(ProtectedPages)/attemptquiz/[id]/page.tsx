import { QuizQuestionType } from "@repo/common";
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import QuizAttempt from "../../../../components/quizAttempt/QuizAttempt";

const AttempQuizPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const quiz = await prisma.quiz.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!quiz) {
    redirect("/");
  }

  let questions: QuizQuestionType[];

  if (typeof quiz?.quizData === "string") {
    const temp = quiz.quizData as string;
    questions = JSON.parse(temp) as QuizQuestionType[];
  } else {
    questions = [];
    redirect("/");
  }

  return (
    <>
      <QuizAttempt questions={questions} title={quiz.title||""} quizId={quiz.id}/>
    </>
  );
};

export default AttempQuizPage;
