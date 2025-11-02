import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompete } from "../context/competeContext";
import { useSession } from "next-auth/react";
import { useWebSocket } from "../context/socketContex";

export function useJoinRoom() {
  const [error, setError] = useState("");
  const { send } = useWebSocket();
  const { setRoomCode, setPlayers, setUserId, setUsername } = useCompete();
  const router = useRouter();
  const session = useSession();

 

  const joinRoom = useCallback(
    (roomCode: string, username: string) => {
      const userId = session.data?.user.id as string;

      setUserId(userId);
      setUsername(username);
      setError("");

      send({
        type: "join_room",
        roomCode: roomCode.toUpperCase(),
        userId,
        username,
      });
    },
    [send, session.data?.user.id, setUserId, setUsername]
  );

  return { joinRoom, error };
}
