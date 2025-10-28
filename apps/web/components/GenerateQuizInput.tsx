"use client";

import React, { useState } from "react";

interface GenerateQuizProps {
  getQuiz: (prompt: string) => void;
}

const GenerateQuizInput = ({ getQuiz }: GenerateQuizProps) => {
  const [prompt, setPrompt] = useState("");

  return (
    <div>
      <HeaderText />
      <form className="max-w-6xl">
        <div className=" mx-16 mb-4 border-2 border-gray-300 rounded-lg bg-gray-50 ">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <textarea
              id="prompt"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none resize-none"
              placeholder="e.g., Create a quiz about Programming fundamentals....."
              required
              minLength={10}
            ></textarea>
          </div>
          <div className="flex items-center justify-center px-3 py-2 border-t-2  border-gray-300">
            <button
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
              onClick={(e) => {
                e.preventDefault();
                getQuiz(prompt);
              }}
              type="submit"
            >
              Generate Quiz
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GenerateQuizInput;

const HeaderText = () => {
  return (
    <div className="text-center">
      <div className="mt-10 mb-5 text-4xl font-semibold ">
        AI Quiz Generator
      </div>
      <div className="text-gray-700 my-10">
        <div>
          Effortlessly generate and customize high-quality quizzes on any topic
          using AI.
        </div>
        <div>
          Perfect for learners, educators, and anyone who wants instant,
          engaging quiz content.
        </div>
      </div>
    </div>
  );
};
