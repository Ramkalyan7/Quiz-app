"use client";

import { useRouter } from "next/navigation";
import { QuizContext, QuizContextType } from "../../context/quizContext";
import { useContext, useState, useEffect, useRef } from "react";
import updateQuizResult from "../../actions/updateQuizResult";

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
  const { dispatch } = useContext(QuizContext) as QuizContextType;
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = () => {
    setLoading(true);

    dispatch({
      type: "SET_DATA",
      payload: {
        quizId: quizId,
        questionCount: totalQuesCount,
        correctCount: correctAnsCount,
      },
    });

    updateQuizResult(quizId, correctAnsCount, totalQuesCount);
    router.push(`/quizresult`);

    // Auto-remove loader after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={() => {
              router.push("/quizzes");
            }}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
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
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md ${
              loading
                ? "opacity-75 cursor-wait"
                : "cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
