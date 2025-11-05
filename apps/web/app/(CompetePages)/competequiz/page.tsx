"use client";

import { useParams, useRouter } from "next/navigation";
import { useCompete } from "../../../context/competeContext";
import { useSubmitAnswer } from "../../../hooks/useSubmitAnswer";
import { useQuestionTimer } from "../../../hooks/useQuestionTimer";
import { useEffect } from "react";
import { useWebSocket } from "../../../context/socketContex";

export default function QuestionPage() {
  const {
    currentQuestion,
    answered,
    leaderboard,
    username,
    setFinalLeaderboard,
    setUserRank,
    setUserScore,
    roomCode,
  } = useCompete();
  const { isConnected } = useWebSocket();
  const { submitAnswer } = useSubmitAnswer();
  const { timeLeft } = useQuestionTimer();
  const { on } = useWebSocket();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = on("quiz_ended", (data: any) => {
      console.log("Quiz ended, navigating to results...");

      setFinalLeaderboard(data.finalLeaderboard);

      const userEntry = data.finalLeaderboard.find(
        (entry: any) => entry.username === username
      );

      if (userEntry) {
        setUserRank(userEntry.rank);
        setUserScore(userEntry.score);
      }

      setTimeout(() => {
        router.push(`/results`);
      }, 2000);
    });

    return unsubscribe;
  }, [
    on,
    username,
    roomCode,
    router,
    setFinalLeaderboard,
    setUserRank,
    setUserScore,
  ]);

  useEffect(() => {
    if (!isConnected || !roomCode || roomCode.length <= 0) {
      router.push("/generatequiz");
      return;
    }
  }, [isConnected, roomCode, router]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3 sm:mb-4 animate-pulse">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin"
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
          </div>
          <p className="text-base sm:text-xl font-semibold text-gray-700">
            ⏳ Loading question...
          </p>
        </div>
      </div>
    );
  }

  const handleAnswerClick = (index: number) => {
    if (answered) return;
    submitAnswer(index);
  };

  const progressPercentage = (timeLeft / currentQuestion.timeLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Progress Bar with Timer */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Question {currentQuestion.questionIndex} of{" "}
                  {currentQuestion.totalQuestions}
                </span>
                <span
                  className={`text-lg sm:text-2xl font-bold transition-colors duration-300 ${
                    timeLeft > 5 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                <div
                  className={`h-3 sm:h-4 rounded-full transition-all duration-300 ${
                    timeLeft > 5
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-red-500 to-red-600"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-8 lg:p-10">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-10 lg:mb-12 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={answered}
                    className={`group p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-left shadow-sm ${
                      answered
                        ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
                        : "bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md cursor-pointer"
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 ${
                          answered
                            ? "bg-gray-200 text-gray-600"
                            : "bg-gray-100 text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <p className="font-medium text-sm sm:text-base text-gray-900 group-hover:text-gray-800 pt-0.5 sm:pt-1 flex-grow">
                        {option}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Answer Submitted Message */}
              {answered && (
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5"
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
                      <p className="font-semibold text-xs sm:text-sm text-green-900">
                        Answer Submitted!
                      </p>
                      <p className="text-xs text-green-800">
                        Waiting for other players to answer...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 sticky top-4 sm:top-6 lg:top-8">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="hidden sm:inline">Live Leaderboard</span>
                <span className="sm:hidden">Leaderboard</span>
              </h3>

              {leaderboard.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏁</div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    No scores yet...
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.username}
                      className={`p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                        entry.username === username
                          ? "bg-blue-50 border-2 border-blue-300 shadow-sm"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0 ${
                              entry.rank === 1
                                ? "bg-yellow-500"
                                : entry.rank === 2
                                  ? "bg-gray-400"
                                  : entry.rank === 3
                                    ? "bg-orange-600"
                                    : "bg-gray-300"
                            }`}
                          >
                            {entry.rank === 1
                              ? "🥇"
                              : entry.rank === 2
                                ? "🥈"
                                : entry.rank === 3
                                  ? "🥉"
                                  : entry.rank}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate flex items-center gap-1">
                              {entry.username.substring(0, 10)}
                              {entry.username.length > 10 && "..."}
                              {entry.username === username && (
                                <span className="text-xs text-blue-600 flex-shrink-0">
                                  (You)
                                </span>
                              )}
                              {entry.answered && (
                                <span className="text-green-600 flex-shrink-0">
                                  ✓
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900 flex-shrink-0">
                          {entry.score}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Your Current Rank */}
              {leaderboard.some((entry) => entry.username === username) && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                  <p className="text-xs text-gray-600 mb-1 font-medium">
                    YOUR RANK
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    #
                    {
                      leaderboard.find((entry) => entry.username === username)
                        ?.rank
                    }{" "}
                    of {leaderboard.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
