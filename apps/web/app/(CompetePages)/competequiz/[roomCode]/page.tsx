"use client";

import { useParams, useRouter } from "next/navigation";
import { useCompete } from "../../../../context/competeContext";
import { useSubmitAnswer } from "../../../../hooks/useSubmitAnswer";
import { useQuestionTimer } from "../../../../hooks/useQuestionTimer";
import { useEffect } from "react";
import { useWebSocket } from "../../../../context/socketContex";

export default function QuestionPage() {
  const params = useParams();
  const roomCode = params.roomCode as string;
  const router = useRouter();

  const {
    currentQuestion,
    answered,
    leaderboard,
    correctAnswerIndex,
    showingResults,
    username,
    setFinalLeaderboard,
    setUserRank,
    setUserScore,
  } = useCompete();

  const { submitAnswer } = useSubmitAnswer();
  const { timeLeft } = useQuestionTimer();
  const { on } = useWebSocket();

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
        router.push(`/results/${roomCode}`);
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

  if (!currentQuestion) {
    return (
      <div>
        <p>⏳ Loading question...</p>
      </div>
    );
  }

  const handleAnswerClick = (index: number) => {
    if (answered || showingResults) return;

    submitAnswer(index);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Main question area */}
      <div style={{ flex: 3 }}>
        <div>
          {/* Question number */}
          <div>
            Question {currentQuestion.questionIndex} /{" "}
            {currentQuestion.totalQuestions}
          </div>

          {/* Show question or results */}
          {showingResults ? (
            <div>
              {/* Results Screen */}
              <h2>Results</h2>

              <div>
                <h3>Question: {currentQuestion.question}</h3>

                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      margin: "5px 0",
                      border: "2px solid",
                      borderColor:
                        index === correctAnswerIndex ? "green" : "gray",
                      backgroundColor:
                        index === correctAnswerIndex ? "#d4edda" : "#f8f9fa",
                    }}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                    {index === correctAnswerIndex && " ✓"}
                  </div>
                ))}
              </div>

              <p>⏳ Next question loading...</p>
            </div>
          ) : (
            <div>
              {/* Question Screen */}

              {/* Timer */}
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color:
                    timeLeft > 10 ? "green" : timeLeft > 5 ? "orange" : "red",
                }}
              >
                {timeLeft}s
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "10px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(timeLeft / currentQuestion.timeLimit) * 100}%`,
                    backgroundColor:
                      timeLeft > 10 ? "green" : timeLeft > 5 ? "orange" : "red",
                    transition: "width 0.1s linear",
                  }}
                />
              </div>

              {/* Question text */}
              <h2 style={{ margin: "30px 0" }}>{currentQuestion.question}</h2>

              {/* Answer options */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={answered || showingResults}
                    style={{
                      padding: "20px",
                      fontSize: "18px",
                      cursor: answered ? "not-allowed" : "pointer",
                      opacity: answered ? 0.6 : 1,
                      border: "2px solid #007bff",
                      borderRadius: "8px",
                      backgroundColor: answered ? "#e0e0e0" : "#fff",
                    }}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>

              {/* Answer submitted message */}
              {answered && (
                <div
                  style={{
                    marginTop: "20px",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  ✓ Answer submitted! Waiting for other players...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard sidebar */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>🏆 Live Leaderboard</h3>

        {leaderboard.length === 0 ? (
          <p>No scores yet...</p>
        ) : (
          <div>
            {leaderboard.map((entry) => (
              <div
                key={entry.username}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  backgroundColor:
                    entry.username === username ? "#d4edda" : "#f8f9fa",
                  border:
                    entry.username === username
                      ? "2px solid green"
                      : "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {entry.rank === 1 && "🥇 "}
                    {entry.rank === 2 && "🥈 "}
                    {entry.rank === 3 && "🥉 "}
                    {entry.username}
                    {entry.answered && " ✓"}
                  </span>
                  <span style={{ fontWeight: "bold" }}>{entry.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
