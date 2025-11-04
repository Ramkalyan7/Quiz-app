"use client";

import React from "react";
import GenerateQuizInput from "../../../components/GenerateQuizInput";
import { generateAndStoreQuiz } from "../../../actions/quiz";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const GenerateQuizPage = () => {
  const params = useSearchParams();

  const getQuiz = async (prompt: string) => {
    if (prompt.length < 10) {
      toast.error("enter atleast 10 charachters");
    } else {
      const response = await generateAndStoreQuiz(prompt);
      if (response?.success) {
        redirect(`/attemptquiz/${response.quizId}`);
      } else {
        toast.error(
          "Unexpected error while generating the Quiz , Please try Again !"
        );
      }
    }
  };

  return (
    <div className="pt-25 min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-10 pb-12 ">
      <div className="max-w-4xl mx-auto">
        <GenerateQuizInput
          getQuiz={getQuiz}
          isCompeteModeOnly={params.get("mode") === "compete"}
        />
      </div>
    </div>
  );
};

export default GenerateQuizPage;
