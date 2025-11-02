"use client";

import { useParams } from "next/navigation";
import { useCompete } from "../../../../context/competeContext";
import { useStartQuiz } from "../../../../hooks/useStartQuiz";
import { useWebSocket } from "../../../../context/socketContex";

export default function LobbyPage() {
  const params = useParams();
  const roomCode = params.roomCode as string;

  const { players, username, userId, isHost } = useCompete();
  const { isConnected } = useWebSocket();
  const { startQuiz } = useStartQuiz();
  console.log(players)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quiz Info Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Quiz Lobby
                  </h1>
                  <p className="text-gray-600">Waiting for players to join...</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
                    Room Code
                  </p>
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    {roomCode}
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Code
              </button>
            </div>

            {/* Players List */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               
                Players in Lobby ({players.length})
              </h2>

              {players.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-6xl mb-4">👋</div>
                  <p className="text-gray-600 font-medium">Waiting for players to join...</p>
                  <p className="text-sm text-gray-500 mt-2">Share the room code to invite friends</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {players.map((player) => (
                    <div
                      key={player.userId}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            {player.username}
                            {player.userId === userId && isHost && (
                              <span className="px-2 py-1 text-xs font-bold text-white bg-orange-500 rounded-full">
                                👑 HOST
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {player.userId === userId ? "You" : "Player"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Points</p>
                          <p className="text-lg font-bold text-gray-900">{player.score}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Status & Actions */}
          <div className="lg:col-span-1">
            {/* Connection Status */}
            {!isConnected && (
              <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-yellow-900">Connection Lost</p>
                    <p className="text-sm text-yellow-800">Reconnecting...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Start Button - Host */}
            {isHost ? (
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white space-y-6 sticky top-24">
                <div>
                  <p className="text-sm opacity-75 mb-2">You're the host</p>
                  <h3 className="text-2xl font-bold">Ready to Start?</h3>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <p className="text-sm opacity-90 mb-2">Players Ready:</p>
                  <p className="text-3xl font-bold">{players.length}</p>
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full bg-white text-green-600 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                >
                  Start Quiz
                </button>

                <p className="text-xs text-center opacity-75">
                  All players will see the first question when you start
                </p>
              </div>
            ) : (
              /* Waiting Status - Player */
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white space-y-6 sticky top-24">
                <div>
                  <p className="text-sm opacity-75 mb-2">Status</p>
                  <h3 className="text-2xl font-bold">Waiting for Host</h3>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <p className="text-sm opacity-90 mb-3">Players in Lobby:</p>
                  <div className="flex flex-wrap gap-2">
                    {players.map((player) => (
                      <div
                        key={player.userId}
                        className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
                      >
                        {player.username}
                        {player.userId === userId && " (You)"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-100"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-200"></div>
                  </div>
                  <p className="text-sm opacity-75">Waiting for host to start...</p>
                </div>

                <p className="text-xs text-center opacity-75 pt-4 border-t border-white/20">
                  You'll be notified when the quiz begins
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
