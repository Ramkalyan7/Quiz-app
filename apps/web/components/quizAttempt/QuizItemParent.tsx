"use client"

import { QuizQuestionType } from "@repo/common";
import QuizItem from "./QuizItem";
import { Dispatch, SetStateAction } from "react";

const QuizItemParent = ({questions,setCorrectAnsCount}:{questions:QuizQuestionType[];setCorrectAnsCount:Dispatch<SetStateAction<number>>}) => {

   

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <QuizItem key={question.question} question={question} index={index} setCorrectAnsCount={setCorrectAnsCount} />
      ))}
    </div>
  );
};

export default QuizItemParent;
