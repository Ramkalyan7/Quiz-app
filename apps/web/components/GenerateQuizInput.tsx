"use client";

import React, { useState } from "react";

interface GenerateQuizProps {
  getQuiz: (prompt: string) => void;
}

const GenerateQuizInput = ({ getQuiz }: GenerateQuizProps) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading,setIsLoading]=useState(false)

  return (
    <div className="space-y-8">
      <HeaderText />
      <form className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-linear-to-r from-blue-500 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-white shrink-0"
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
              <h2 className="text-xl font-semibold text-white">
                Describe Your Quiz Topic
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <textarea
              id="prompt"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              rows={5}
              className="w-full px-4 py-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none resize-none placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="e.g., Create a quiz about Programming fundamentals covering variables, loops, functions, and object-oriented programming concepts....."
              required
              minLength={10}
            ></textarea>

            <div className="flex items-center justify-between ">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {prompt.length}
                </span>
                <span> characters (minimum 10 required)</span>
              </div>
              <button
                className="inline-flex items-center gap-2 py-3 px-6 text-sm font-semibold text-center text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  getQuiz(prompt);
                }}
                type="submit"
                disabled={prompt.length < 10 || isLoading}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {isLoading ? "Generating..." : "Generate Quiz"}
              </button>
            </div>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-purple-50 px-6 py-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-gray-700">💡 Tip:</span> Be
              specific with your topic and include key concepts you want covered
              in the quiz for best results.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuizInput;

const HeaderText = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <h1 className="text-5xl font-bold text-gray-900">AI Quiz Generator</h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-2">
        <p className="text-lg text-gray-700 font-medium">
          Effortlessly generate and customize high-quality quizzes on any topic
          using AI.
        </p>
        <p className="text-base text-gray-600">
          Perfect for learners, educators, and anyone who wants instant,
          engaging quiz content.
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-6 pt-4 flex-wrap">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="text-xl">✨</span>
          <span className="text-sm font-medium text-gray-700">AI-Powered</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="text-xl">⚡</span>
          <span className="text-sm font-medium text-gray-700">
            Instant Generation
          </span>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="text-xl">🎯</span>
          <span className="text-sm font-medium text-gray-700">
            Fully Customizable
          </span>
        </div>
      </div>
    </div>
  );
};
