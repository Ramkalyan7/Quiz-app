"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useCompete } from "../../../../context/competeContext";

export default function ResultsPage() {
  const params = useParams();
  const roomCode = params.roomCode as string;

  const { finalLeaderboard,  username } = useCompete();

  // If no results yet, show loading
  if (finalLeaderboard.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>⏳ Loading results...</p>
      </div>
    );
  }

  // Find user's entry
  const userEntry = finalLeaderboard.find(
    (entry) => entry.username === username
  );

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        🎉 Quiz Complete!
      </h1>

      {/* User's result (highlighted) */}
      {userEntry && (
        <div
          style={{
            backgroundColor: "#d4edda",
            border: "3px solid green",
            borderRadius: "10px",
            padding: "30px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>
            {userEntry.rank === 1 && "🥇"}
            {userEntry.rank === 2 && "🥈"}
            {userEntry.rank === 3 && "🥉"}
            {userEntry.rank > 3 && "🏅"}
          </div>

          <h2 style={{ margin: "10px 0" }}>You finished #{userEntry.rank}</h2>

          <div style={{ fontSize: "36px", fontWeight: "bold", color: "green" }}>
            {userEntry.score} points
          </div>

          {userEntry.streak !== undefined && (
            <p style={{ marginTop: "10px" }}>
              🔥 Best streak: {userEntry.streak}
            </p>
          )}
        </div>
      )}

      {/* Final Leaderboard */}
      <div>
        <h2 style={{ marginBottom: "20px" }}>🏆 Final Leaderboard</h2>

        <div>
          {finalLeaderboard.map((entry) => (
            <div
              key={entry.username}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor:
                  entry.username === username ? "#f0f0f0" : "#fff",
                border:
                  entry.username === username
                    ? "2px solid green"
                    : "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "24px", minWidth: "40px" }}>
                  {entry.rank === 1 && "🥇"}
                  {entry.rank === 2 && "🥈"}
                  {entry.rank === 3 && "🥉"}
                  {entry.rank > 3 && `#${entry.rank}`}
                </span>

                <div>
                  <div style={{ fontWeight: "bold" }}>{entry.username}</div>
                  {entry.streak !== undefined && (
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      🔥 Streak: {entry.streak}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                {entry.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Link href="/">
          <button style={{ padding: "12px 24px", fontSize: "16px" }}>
            🏠 Home
          </button>
        </Link>

        <Link href="/join">
          <button style={{ padding: "12px 24px", fontSize: "16px" }}>
            🎮 Join Another Quiz
          </button>
        </Link>
      </div>

      {/* Room code display */}
      <div style={{ marginTop: "40px", textAlign: "center", color: "#666" }}>
        <p>Room code: {roomCode}</p>
      </div>
    </div>
  );
}
