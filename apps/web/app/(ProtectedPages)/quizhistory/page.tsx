import React from "react";
import QuizComponent from "../../../components/QuizComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

const QuizHistory = async () => {
  const getUserQuizHistory = async () => {
    try {
      const session = await getServerSession(authOptions);
      const userId = Number(session?.user.id);

      const quizzes = await prisma.quizAttempt.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          completedAt: "desc",
        },
        distinct: ["quizId"],
        include: {
          quiz: true,
        },
      });

      if (!quizzes || quizzes.length == 0) {
        return [];
      }
      return quizzes;
    } catch (error) {
      console.log("get user history", error);
      return [];
    }
  };

  const history = await getUserQuizHistory();

  return (
    <div className="px-10">
      <HeaderText />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history?.map(({quiz,totalScore,score}) => {
          return (
            <QuizComponent
              key={quiz.id}
              title={quiz.title}
              tags={quiz.tags}
              id={quiz.id}
              isFromHistory={true}
              totalScore={totalScore}
              score={score}
            />
          );
        })}
      </div>
    </div>
  );
};

const HeaderText = () => {
  return (
    <div className="text-center mb-10">
      <div className="mt-10 mb-5 text-4xl font-semibold ">
        Your Quiz History
      </div>
      <div className="text-gray-700 ">
        All your quiz attempts and scores in one place.
      </div>
      <div></div>
    </div>
  );
};

export default QuizHistory;
