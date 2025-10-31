"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { QuizQuestionType } from "@repo/common";

const QuizItem = ({
  question,
  index,
  setCorrectAnsCount,
}: {
  question: QuizQuestionType;
  index: number;
  setCorrectAnsCount: Dispatch<SetStateAction<number>>;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden ${isSelected && "pointer-events-none"}`}
    >
      <div className="bg-linear-to-r bg-indigo-500 px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg shadow-md">
            {index + 1}
          </div>
          <h3 className="text-xl font-semibold text-white pt-1 leading-relaxed">
            {question.question}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {question.options.map((option: string) => (
          <QuizOption
            key={option}
            option={option}
            question={question.question}
            correctOption={question.answer}
            setIsSelected={setIsSelected}
            setCorrectAnsCount={setCorrectAnsCount}
          />
        ))}
      </div>

      {isSelected && (
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">
                  Correct Answer
                </p>
                <p className="text-base font-medium text-green-700">
                  {question.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-blue-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  Explanation
                </p>
                <p className="text-base text-blue-700 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizItem;

const QuizOption = ({
  option,
  question,
  correctOption,
  setIsSelected,
  setCorrectAnsCount,
}: {
  option: string;
  question: string;
  correctOption: string;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
  setCorrectAnsCount: Dispatch<SetStateAction<number>>;
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setIsSelected(true);
    if (
      e.target.value?.toLocaleLowerCase() === correctOption.toLocaleLowerCase()
    ) {
      setCorrectAnsCount((prev) => prev + 1);
      console.log("updated");
    }
  };

  // Determine style based on selection
  const isSelected = selected === option;
  const isCorrect = selected === correctOption && isSelected;
  const isWrong = isSelected && selected !== correctOption;

  const borderColor = isCorrect
    ? "border-green-500"
    : isWrong
      ? "border-red-500"
      : "border-gray-200";

  const bgColor = isCorrect
    ? "bg-green-50"
    : isWrong
      ? "bg-red-50"
      : "bg-white";

  return (
    <div className="group relative">
      <input
        type="radio"
        name={question}
        id={`${option}${question}`}
        value={option}
        className="peer sr-only"
        onChange={handleChange}
        disabled={isSelected}
      />

      <label
        htmlFor={`${option}${question}`}
        className={`flex items-center gap-3 p-4 rounded-lg border-2 ${borderColor} ${bgColor} cursor-pointer transition-all duration-200`}
      >
        <div className="shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 transition-colors duration-200 flex items-center justify-center">
          <div
            className={`w-2.5 h-2.5 rounded-full bg-blue-500 transition-opacity duration-200 ${
              isSelected ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        <span
          className={`text-gray-700 font-medium ${
            isCorrect ? "text-green-700" : isWrong ? "text-red-700" : ""
          }`}
        >
          {option}
        </span>
      </label>
    </div>
  );
};
