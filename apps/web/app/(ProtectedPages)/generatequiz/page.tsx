"use client";

import React from "react";
import GenerateQuizInput from "../../../components/GenerateQuizInput";
import { generateAndStoreQuiz } from "../../../actions/quiz";
import { redirect } from "next/navigation";

const GenerateQuizPage = () => {
  const getQuiz = async (prompt: string) => {
    if (prompt.length < 10) {
      window.alert("enter atleast 10 charachters");
    } else {
      const response = await generateAndStoreQuiz(prompt);
      if (response?.success) {
        redirect(`/attemptquiz/${response.quizId}`);
      } else {
        window.alert(
          "Unexpected error while generating the Quiz , Please try Again !"
        );
      }
    }
  };

  return (
    <div className="flex justify-center">
      <GenerateQuizInput getQuiz={getQuiz} />
    </div>
  );
};

export default GenerateQuizPage;
