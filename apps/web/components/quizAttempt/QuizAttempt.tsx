"use client"

import { QuizQuestionType } from "@repo/common";
import HeaderText from "./HeaderText";
import Navbar from "./Navbar";
import QuizItemParent from "./QuizItemParent";
import { useState } from "react";
import { QuizProvider } from "../../context/quizContext";

const QuizAttempt = ({
  questions,
  title,
  quizId
}: {
  questions: QuizQuestionType[];
  title: string;
  quizId:number
}) => {
  const [correctAnsCount, setCorrectAnsCount] = useState(0);

  return (
    <>
      <Navbar correctAnsCount={correctAnsCount} quizId={quizId} totalQuesCount={questions.length} />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-10 pb-8 pt-5">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <HeaderText questions={questions} title={title} />
            <QuizItemParent questions={questions} setCorrectAnsCount={setCorrectAnsCount} />
          </div>
        </div>
      </div>
   </>
  );
};

export default QuizAttempt;
