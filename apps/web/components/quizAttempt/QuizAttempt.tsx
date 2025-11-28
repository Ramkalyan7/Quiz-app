"use client";

import { QuizQuestionType } from "@repo/common";
import HeaderText from "./HeaderText";
import Navbar from "./Navbar";
import QuizItemParent from "./QuizItemParent";
import { useState } from "react";

const QuizAttempt = ({
  questions,
  title,
  quizId,
}: {
  questions: QuizQuestionType[];
  title: string;
  quizId: number;
}) => {
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  return (
    <>
      <Navbar
        correctAnsCount={correctAnsCount}
        quizId={quizId}
        totalQuesCount={questions.length}
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-3 sm:px-4 lg:px-10 pb-6 sm:pb-8 sm:pt-10">
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <HeaderText questions={questions} title={title} />
            <QuizItemParent
              questions={questions}
              setCorrectAnsCount={setCorrectAnsCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizAttempt;
