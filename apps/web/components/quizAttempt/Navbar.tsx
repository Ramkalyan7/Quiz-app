"use client";

import { useRouter } from "next/navigation";
import { QuizContext, QuizContextType } from "../../context/quizContext";
import { useContext } from "react";

const Navbar = ({
  correctAnsCount,
  quizId,
  totalQuesCount,
}: {
  correctAnsCount: number;
  quizId: number;
  totalQuesCount: number;
}) => {
  const router = useRouter();

  const { state, dispatch } = useContext(QuizContext) as QuizContextType;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={() => {
              router.push("/quizzes");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Submit Button */}
          <button
            onClick={() => {
              dispatch({
                type: "SET_DATA",
                payload: {
                  quizId: quizId,
                  questionCount: totalQuesCount,
                  correctCount: correctAnsCount,
                },
              });
              router.push(`/quizresult`);
            }}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
