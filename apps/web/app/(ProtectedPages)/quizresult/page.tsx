"use client";

import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../../context/quizContext";
import { useRouter } from "next/navigation";

export function QuizResultPage() {
  const context = useContext(QuizContext);
  const router = useRouter();
  const [tryAgainLoading, setTryAgainLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

  useEffect(() => {
    if (!context || context.state.quizId === 0) {
      router.push("/quizzes");
    }
  }, [context, router]);

  if (!context || context.state.quizId == 0) {
    return null;
  }

  const { state } = context;
  const results = state;

  const percentage = Math.round(
    (results.correctCount / results.questionCount) * 100
  );
  const isPassed = percentage >= 70;

  const handleGoHome = () => {
    setHomeLoading(true);
    router.push("/quizzes");
  };

  const handleTryAgain = () => {
    setTryAgainLoading(true);
    router.push(`/attemptquiz/${results.quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-3 sm:px-4 lg:px-10 py-6 sm:py-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-2 sm:mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
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
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Quiz Complete!
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">
            Here&apos;s how you performed
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-8 lg:p-10 mb-6 sm:mb-8">
          {/* Score Display */}
          <div className="text-center mb-8 sm:mb-10 hidden sm:block">
            <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <svg className="transform -rotate-90 w-24 h-24 sm:w-32 sm:h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(percentage / 100) * 351.86} 351.86`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      {percentage}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                      Score
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold mb-3 sm:mb-4 text-xs sm:text-sm hidden sm:inline-block  ${
                isPassed
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {isPassed ? "✓ Passed" : "Needs Practice"}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-0.5 sm:mb-1">
                {results.questionCount}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Total Questions
              </div>
            </div>

            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-0.5 sm:mb-1">
                {results.correctCount}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Correct Answers
              </div>
            </div>

            <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-0.5 sm:mb-1">
                {results.questionCount - results.correctCount}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Incorrect</div>
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        <div
          className={`rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 ${
            isPassed
              ? "bg-green-50 border-green-500"
              : "bg-blue-50 border-blue-500"
          }`}
        >
          <p
            className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${
              isPassed ? "text-green-900" : "text-blue-900"
            }`}
          >
            {isPassed ? "🎉 Great Job!" : "💡 Keep Learning"}
          </p>
          <p
            className={`text-xs sm:text-sm ${isPassed ? "text-green-800" : "text-blue-800"}`}
          >
            {isPassed
              ? "You've successfully completed this quiz! Your performance shows a good understanding of the material."
              : "Don't worry! Try the quiz again to improve your score and strengthen your knowledge."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleTryAgain}
            disabled={tryAgainLoading}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg ${
              tryAgainLoading ? "opacity-75 cursor-wait" : "cursor-pointer"
            }`}
          >
            {tryAgainLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
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
                <span className="hidden sm:inline">Loading...</span>
                <span className="sm:hidden">Loading</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </>
            )}
          </button>

          <button
            onClick={handleGoHome}
            disabled={homeLoading}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-4 focus:ring-gray-300 transition-all duration-200 ${
              homeLoading ? "opacity-75 cursor-wait" : "cursor-pointer"
            }`}
          >
            {homeLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
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
                <span className="hidden sm:inline">Loading...</span>
                <span className="sm:hidden">Loading</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4-2"
                  />
                </svg>
                All Quizzes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizResultPage;
