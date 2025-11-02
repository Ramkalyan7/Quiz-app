"use client";

import { useState } from "react";
import { useJoinRoom } from "../../../hooks/useJoinRoom";
import { useWebSocket } from "../../../context/socketContex";

export default function JoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { joinRoom, error } = useJoinRoom(); // ← Get error from hook
  const { isConnected } = useWebSocket();

  const handleJoin = () => {
    if (!roomCode.trim()) {
      // This is a client-side validation error
      // Different from server errors
      return;
    }

    if (!username.trim()) {
      return;
    }

    if (!isConnected) {
      return;
    }

    setLoading(true);
    joinRoom(roomCode, username);

    // Stop loading after 3 seconds (timeout)
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div>
      {!isConnected && <div>⏳ Connecting...</div>}

      {error && <div>❌ {error}</div>}

      <div>
        <label>Room Code</label>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          placeholder="e.g., QUIZ42"
          maxLength={6}
          disabled={loading || !isConnected}
        />
      </div>

      <div>
        <label>Your Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          disabled={loading || !isConnected}
        />
      </div>

      <button onClick={handleJoin} disabled={loading || !isConnected}>
        {loading ? "⏳ Joining..." : "🚀 Join Quiz"}
      </button>
    </div>
  );
}
