import React from "react";
import QuizComponent from "../../../components/QuizComponent";

const QuizHistory = () => {
  return (
    <div>
      <HeaderText />
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
