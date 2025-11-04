"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect, useRef } from "react";
import { useJoinRoom } from "../../../hooks/useJoinRoom";
import { toast } from "react-toastify";

export default function Compete() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [hostLoading, setHostLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const { joinRoom } = useJoinRoom();
  const hostTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const joinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHostQuiz = () => {
    setHostLoading(true);

    hostTimeoutRef.current = setTimeout(() => {
      setHostLoading(false);
    }, 3000);

    router.push("/generatequiz?mode=compete");
  };

  const handleJoinQuiz = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomCode.length < 6) {
      toast.error("room code length should be atleast 6");
      return;
    }
    setJoinLoading(true);

    joinTimeoutRef.current = setTimeout(() => {
      setJoinLoading(false);
    }, 3000);

    joinRoom(roomCode, name);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hostTimeoutRef.current) {
        clearTimeout(hostTimeoutRef.current);
      }
      if (joinTimeoutRef.current) {
        clearTimeout(joinTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-3 sm:mb-4">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Multiplayer Quiz
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Create or join a quiz to compete with friends!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Host a Quiz Card */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl shadow-xl border border-purple-300 p-6 sm:p-10 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl mb-4 sm:mb-6 backdrop-blur">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
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

            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
              Host a Quiz
            </h2>
            <p className="text-sm sm:text-base text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Create a new AI-powered quiz on any topic and share the room code
              with your friends to compete together in real-time!
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">✨</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    AI Generated
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">
                    Instant questions on any topic
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">📊</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Full Control
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">
                    Start the quiz whenever you're ready
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">👥</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Invite Friends
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">
                    Share your unique room code
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleHostQuiz}
              disabled={hostLoading}
              className={`w-full bg-white text-purple-600 font-bold py-3 sm:py-4 rounded-xl hover:bg-gray-100 focus:ring-4 focus:ring-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg flex items-center justify-center gap-2 ${
                hostLoading ? "opacity-75 cursor-wait" : "cursor-pointer"
              }`}
            >
              {hostLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 sm:h-6 sm:w-6"
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
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                </>
              )}
            </button>
          </div>

          {/* Join a Quiz Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6">
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
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Join a Quiz
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Enter the room code your friend shared and join the competitive
              quiz in real-time!
            </p>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleJoinQuiz}>
              {/* Room Code Input */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Room Code
                </label>
                <input
                  onChange={(e) => {
                    setRoomCode(e.target.value);
                  }}
                  disabled={joinLoading}
                  type="text"
                  placeholder="e.g., QUIZ42"
                  maxLength={6}
                  required
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-xl sm:text-2xl font-bold text-center text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 uppercase ${
                    joinLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Ask your friend for the room code
                </p>
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={joinLoading}
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 ${
                    joinLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Join Button */}
              <button
                type="submit"
                disabled={joinLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg flex items-center justify-center gap-2 ${
                  joinLoading ? "opacity-75 cursor-wait" : "cursor-pointer"
                }`}
              >
                {joinLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 sm:h-6 sm:w-6"
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
                    Joining...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
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
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 text-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⚡</div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">
              Real-Time
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Live scoring and instant leaderboard updates
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 text-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏆</div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">
              Competitive
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Speed and accuracy combined scoring system
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 text-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">👥</div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">
              Multiplayer
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Compete with unlimited friends seamlessly
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
            Ready to Compete?
          </h2>
          <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4 sm:mb-6">
            Choose your role: Host a new quiz or join your friend's room to
            start competing now!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={handleHostQuiz}
              disabled={hostLoading}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg ${
                hostLoading ? "opacity-75 cursor-wait" : "cursor-pointer"
              }`}
            >
              {hostLoading ? "Loading..." : "Host a Quiz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
