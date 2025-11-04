"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCreateQuiz } from "../hooks/useCreateQuiz";
import { useSession } from "next-auth/react";
import { useWebSocket } from "../context/socketContex";
import { toast } from "react-toastify";

interface GenerateQuizProps {
  getQuiz: (prompt: string, mode: "learn" | "compete") => void;
  isCompeteModeOnly?: boolean;
}

const GenerateQuizInput = ({
  getQuiz,
  isCompeteModeOnly = false,
}: GenerateQuizProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"learn" | "compete" | null>(
    null
  );
  const [error, setError] = useState("");
  const { isConnected } = useWebSocket();
  const learnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const competeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get create quiz hook
  const {
    createQuiz,
    error: createError,
    loading: createLoading,
  } = useCreateQuiz();

  const session = useSession();

  const handleGenerateQuiz = async (mode: "learn" | "compete") => {
    try {
      if (prompt.length < 10) return;

      if (mode === "compete") {
        if (!isConnected) {
          setError("WebSocket not connected. Please refresh the page.");
          return;
        }
      }

      setIsLoading(true);
      setSelectedMode(mode);
      setError("");

      if (mode === "compete") {
        await createQuiz(prompt, session.data?.user.name || "");
        competeTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          setSelectedMode(null);
        }, 35000);
      } else {
        getQuiz(prompt, mode);
        learnTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          setSelectedMode(null);
        }, 30000);
      }
    } catch (error) {
      console.log("handleGenerateQuiz", error);
      toast.error("Error while generating Quiz !");
      setIsLoading(false);
      setSelectedMode(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (learnTimeoutRef.current) {
        clearTimeout(learnTimeoutRef.current);
      }
      if (competeTimeoutRef.current) {
        clearTimeout(competeTimeoutRef.current);
      }
    };
  }, []);

  const displayError = error || createError;

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      <HeaderText isCompeteModeOnly={isCompeteModeOnly} />
      <form className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h2 className="text-base sm:text-xl font-semibold text-white">
                Describe Your Quiz Topic
              </h2>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {displayError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-red-700 text-xs sm:text-sm">
                ❌ {displayError}
              </div>
            )}

            {!isCompeteModeOnly && !isConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 text-yellow-700 text-xs sm:text-sm">
                ⚠️ WebSocket not connected. Compete mode may not work.
              </div>
            )}

            <textarea
              id="prompt"
              onChange={(e) => {
                setPrompt(e.target.value);
                setError("");
              }}
              rows={5}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none resize-none placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                isLoading || createLoading ? "opacity-50" : ""
              }`}
              placeholder="e.g., Create a quiz about Programming fundamentals covering variables, loops, functions, and object-oriented programming concepts....."
              required
              minLength={10}
              disabled={isLoading || createLoading}
            ></textarea>

            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {prompt.length}
                </span>
                <span >
                  {" "}
                  characters (minimum 10 required)
                </span>
              </div>
            </div>

            {/* Mode Selection with Dual Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
              {/* Learn Button */}
              {!isCompeteModeOnly && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleGenerateQuiz("learn");
                  }}
                  disabled={
                    prompt.length < 10 ||
                    (isLoading && selectedMode !== "learn") ||
                    createLoading
                  }
                  className={`group relative inline-flex items-center justify-center gap-2 py-3 px-4 sm:px-6 text-sm font-semibold text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl ${
                    prompt.length < 10 ||
                    (isLoading && selectedMode !== "learn") ||
                    createLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isLoading && selectedMode === "learn" ? (
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
                      <span className="hidden sm:inline">Generating...</span>
                      <span className="sm:hidden">Loading...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">📚 Learn Solo</span>
                      <span className="sm:hidden">📚 Learn</span>
                    </>
                  )}
                </button>
              )}

              {/* Compete Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleGenerateQuiz("compete");
                }}
                disabled={
                  prompt.length < 10 ||
                  (isLoading && selectedMode !== "compete") ||
                  createLoading ||
                  !isConnected
                }
                className={`group relative inline-flex items-center justify-center gap-2 py-3 px-4 sm:px-6 text-sm font-semibold text-center text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  prompt.length < 10 ||
                  (isLoading && selectedMode !== "compete") ||
                  createLoading ||
                  !isConnected
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isLoading && selectedMode === "compete" ? (
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
                    <span className="hidden sm:inline">Generating...</span>
                    <span className="sm:hidden">Loading...</span>
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      🏆 Compete with Friends
                    </span>
                    <span className="sm:hidden">🏆 Compete</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips section - hidden on mobile */}
          <div className="hidden sm:block bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-6 py-3 border-t border-gray-200">
            <div className="space-y-2">
              <p className="text-xs text-gray-600">
                <span className="font-semibold text-gray-700">💡 Tip:</span> Be
                specific with your topic and include key concepts you want
                covered in the quiz for best results.
              </p>
              {!isCompeteModeOnly && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📚</span>
                    <span>
                      <span className="font-semibold">Learn Mode:</span>{" "}
                      Practice alone with instant feedback
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">🏆</span>
                    <span>
                      <span className="font-semibold">Compete Mode:</span> Share
                      a room code and race against friends!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuizInput;

const HeaderText = ({ isCompeteModeOnly }: { isCompeteModeOnly: boolean }) => {
  return (
    <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 px-4">
      <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          AI Quiz Generator
        </h1>
      </div>

      {/* Description - hidden on mobile */}
      <div className="hidden sm:block max-w-2xl mx-auto space-y-2">
        <p className="text-base sm:text-lg text-gray-700 font-medium">
          Effortlessly generate and customize high-quality quizzes on any topic
          using AI.
        </p>
        <p className="text-sm sm:text-base text-gray-600">
          Choose your mode: Learn solo with instant feedback or compete with
          friends in real-time!
        </p>
      </div>

      {/* Features badges - hidden on mobile */}
      <div className="hidden sm:flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 flex-wrap">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="text-base sm:text-xl">✨</span>
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            AI-Powered
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="text-base sm:text-xl">⚡</span>
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Instant Generation
          </span>
        </div>
        {!isCompeteModeOnly && (
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-sm">
            <span className="text-base sm:text-xl">🎯</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Two Game Modes
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
