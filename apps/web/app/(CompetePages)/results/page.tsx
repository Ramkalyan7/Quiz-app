"use client";

import Link from "next/link";
import { useCompete } from "../../../context/competeContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const { finalLeaderboard, username, roomCode, questions } = useCompete();
  const router = useRouter();
  const [showAnswers, setShowAnswers] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      router.push("/generatequiz");
      return;
    }
  }, [router, username]);

  // If no results yet, show loading
  if (finalLeaderboard.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <p className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700">
          Loading results...
        </p>
      </div>
    );
  }

  // Find user's entry
  const userEntry = finalLeaderboard.find(
    (entry) => entry.username === username
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-3 sm:px-4 lg:px-6 py-6 sm:py-12">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-10">
           Quiz Complete!
        </h1>

        {/* User's result (highlighted) */}
        {userEntry && (
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-green-400 rounded-lg sm:rounded-2xl p-6 sm:p-8 text-center text-white mb-6 sm:mb-10 shadow-xl">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-3">
              {userEntry.rank === 1 && "🥇"}
              {userEntry.rank === 2 && "🥈"}
              {userEntry.rank === 3 && "🥉"}
              {userEntry.rank > 3 && "🏅"}
            </div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
              You finished #{userEntry.rank}
            </h2>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              {userEntry.score} points
            </div>

            {userEntry.maxStreak !== undefined && (
              <p className="text-sm sm:text-base lg:text-lg mt-2 sm:mt-3">
                 Best streak: {userEntry.maxStreak}
              </p>
            )}
          </div>
        )}

        {/* Final Leaderboard */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 lg:p-8 mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
             Final Leaderboard
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {finalLeaderboard.map((entry) => (
              <div
                key={entry.username}
                className={`flex justify-between items-center p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                  entry.username === username
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-2xl sm:text-3xl min-w-8">
                    {entry.rank === 1 && "🥇"}
                    {entry.rank === 2 && "🥈"}
                    {entry.rank === 3 && "🥉"}
                    {entry.rank > 3 && `#${entry.rank}`}
                  </span>

                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-sm lg:text-base text-gray-900 truncate">
                      {entry.username}
                    </div>
                    {entry.maxStreak !== undefined && (
                      <div className="text-xs text-gray-600">
                         Streak: {entry.maxStreak}
                      </div>
                    )}
                  </div>
                </div>

                <div className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 flex-shrink-0">
                  {entry.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions & Answers Section */}
        {questions && questions.length > 0 && (
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 lg:p-8 mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Quiz Answers
              </h2>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
              >
                {showAnswers ? "Hide Answers" : "Show Answers"}
              </button>
            </div>

            {showAnswers && (
              <div className="space-y-4 sm:space-y-6">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 flex-grow pt-0.5">
                        {q.question}
                      </h3>
                    </div>

                    {/* Correct Answer */}
                    <div className="ml-8 sm:ml-10 lg:ml-12 mb-3 sm:mb-4">
                      <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-3 sm:p-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-green-900 mb-1">
                              ✓ Correct Answer
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-green-800">
                              {q.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="ml-8 sm:ml-10 lg:ml-12 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5"
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
                          <p className="text-xs sm:text-sm font-bold text-blue-900 mb-1">
                             Explanation
                          </p>
                          <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-10">
          <Link href="/" onClick={() => setHomeLoading(true)} className="flex-1 sm:flex-none">
            <button
              disabled={homeLoading}
              className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
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
                " Home"
              )}
            </button>
          </Link>

          <Link href="/compete" onClick={() => setJoinLoading(true)} className="flex-1 sm:flex-none">
            <button
              disabled={joinLoading}
              className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 ${
                joinLoading ? "opacity-75 cursor-wait" : "cursor-pointer"
              }`}
            >
              {joinLoading ? (
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
                  <span className="hidden sm:inline">Join Another Quiz</span>
                  <span className="sm:hidden">Join Quiz</span>
                </>
              )}
            </button>
          </Link>
        </div>

        {/* Room code display */}
        <div className="text-center text-xs sm:text-sm text-gray-600">
          <p>
            Room code:{" "}
            <span className="font-mono font-semibold break-all">{roomCode}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
