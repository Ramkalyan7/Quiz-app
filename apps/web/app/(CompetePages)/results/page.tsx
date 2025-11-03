"use client";

import Link from "next/link";
import { useCompete } from "../../../context/competeContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const { finalLeaderboard, username, roomCode } = useCompete();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push("/generatequiz");
      return;
    }
  }, [router, username]);

  // If no results yet, show loading
  if (finalLeaderboard.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          ⏳ Loading results...
        </p>
      </div>
    );
  }

  // Find user's entry
  const userEntry = finalLeaderboard.find(
    (entry) => entry.username === username
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-10">
          🎉 Quiz Complete!
        </h1>

        {/* User's result (highlighted) */}
        {userEntry && (
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-green-400 rounded-2xl p-8 text-center text-white mb-10 shadow-xl">
            <div className="text-6xl mb-3">
              {userEntry.rank === 1 && "🥇"}
              {userEntry.rank === 2 && "🥈"}
              {userEntry.rank === 3 && "🥉"}
              {userEntry.rank > 3 && "🏅"}
            </div>

            <h2 className="text-2xl font-bold mb-3">
              You finished #{userEntry.rank}
            </h2>

            <div className="text-5xl font-bold mb-4">
              {userEntry.score} points
            </div>

            {userEntry.maxStreak !== undefined && (
              <p className="text-lg mt-3">
                🔥 Best streak: {userEntry.maxStreak}
              </p>
            )}
          </div>
        )}

        {/* Final Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🏆 Final Leaderboard
          </h2>

          <div className="space-y-3">
            {finalLeaderboard.map((entry) => (
              <div
                key={entry.username}
                className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  entry.username === username
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl min-w-10">
                    {entry.rank === 1 && "🥇"}
                    {entry.rank === 2 && "🥈"}
                    {entry.rank === 3 && "🥉"}
                    {entry.rank > 3 && `#${entry.rank}`}
                  </span>

                  <div>
                    <div className="font-bold text-gray-900">
                      {entry.username}
                    </div>
                    {entry.maxStreak !== undefined && (
                      <div className="text-xs text-gray-600">
                        🔥 Streak: {entry.maxStreak}
                      </div>
                    )}
                  </div>
                </div>

                <div className="font-bold text-xl text-gray-900">
                  {entry.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mb-10">
          <Link href="/">
            <button className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              🏠 Home
            </button>
          </Link>

          <Link href="/compete">
            <button className="px-6 py-3 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 cursor-pointer">
              🎮 Join Another Quiz
            </button>
          </Link>
        </div>

        {/* Room code display */}
        <div className="text-center text-gray-600">
          <p>
            Room code:{" "}
            <span className="font-mono font-semibold">{roomCode}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
