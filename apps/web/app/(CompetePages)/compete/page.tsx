"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useJoinRoom } from "../../../hooks/useJoinRoom";
import { useCompete } from "../../../context/competeContext";

export default function Compete() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const { joinRoom } = useJoinRoom();
const {loading , setLoading} = useCompete();
  const handleHostQuiz = () => {
    router.push("/generatequiz?mode=compete");
  };

  const handleJoinQuiz = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomCode.length < 6) {
      window.alert("room code length should be atleast 6");
      return;
    }
    setLoading(true);
    joinRoom(roomCode, name);
  };

  return (
    <div className="pt-20 min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-white"
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
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Multiplayer Quiz
          </h1>
          <p className="text-xl text-gray-600">
            Create or join a quiz to compete with friends!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Host a Quiz Card */}
          <Link
            href={"/generatequiz?mode=compete"}
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl border border-purple-300 p-10 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-6 backdrop-blur">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-3">Host a Quiz</h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              Create a new AI-powered quiz on any topic and share the room code
              with your friends to compete together in real-time!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-semibold">AI Generated</p>
                  <p className="text-sm text-white/80">
                    Instant questions on any topic
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold">Full Control</p>
                  <p className="text-sm text-white/80">
                    Start the quiz whenever you're ready
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="font-semibold">Invite Friends</p>
                  <p className="text-sm text-white/80">
                    Share your unique room code
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleHostQuiz}
              className="w-full bg-white text-purple-600 font-bold py-4 rounded-xl hover:bg-gray-100 focus:ring-4 focus:ring-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-no-drop"
              disabled={loading}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create & Host
            </button>
          </Link>

          {/* Join a Quiz Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Join a Quiz
            </h2>
            <p className="text-gray-600 mb-8">
              Enter the room code your friend shared and join the competitive
              quiz in real-time!
            </p>

            <form className="space-y-6" onSubmit={handleJoinQuiz}>
              {/* Room Code Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Code
                </label>
                <input
                  onChange={(e) => {
                    setRoomCode(e.target.value);
                  }}
                  disabled={loading}
                  type="text"
                  placeholder="e.g., QUIZ42"
                  maxLength={6}
                  required
                  className="w-full px-6 py-4 text-2xl font-bold text-center text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 uppercase"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Ask your friend for the room code
                </p>
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={loading}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                />
              </div>

              {/* Join Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2disabled:cursor-no-drop cursor-pointer"
                disabled={loading}
              >
                <svg
                  className="w-6 h-6"
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
                Join Quiz
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Real-Time</h3>
            <p className="text-sm text-gray-600">
              Live scoring and instant leaderboard updates
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-bold text-gray-900 mb-2">Competitive</h3>
            <p className="text-sm text-gray-600">
              Speed and accuracy combined scoring system
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="font-bold text-gray-900 mb-2">Multiplayer</h3>
            <p className="text-sm text-gray-600">
              Compete with unlimited friends seamlessly
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Compete?</h2>
          <p className="text-lg opacity-90 mb-6">
            Choose your role: Host a new quiz or join your friend's room to
            start competing now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleHostQuiz}
              className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Host a Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
