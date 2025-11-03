import { useCallback, useState } from "react";
import { useCompete } from "../context/competeContext";
import { useSession } from "next-auth/react";
import { useWebSocket } from "../context/socketContex";

export function useJoinRoom() {
  const [error, setError] = useState("");
  const { send } = useWebSocket();
  const { setUserId, setUsername, setLoading, reset} = useCompete();
  const session = useSession();



  const joinRoom = useCallback(
    (roomCode: string, name?: string) => {
      reset();
      setLoading(true)
      const userId = session.data?.user.id as string;

      setUserId(userId);
      let userName: string;
      if (name && name.length > 0) {
        setUsername(name);
        userName = name;
      }
      else {
        setUsername(session.data?.user.name || "")
        userName = session.data?.user.name || "";
      }
      setError("");

      send({
        type: "join_room",
        roomCode: roomCode.toUpperCase(),
        userId,
        username: userName,
      });
    },
    [reset, send, session.data?.user.id, session.data?.user.name, setLoading, setUserId, setUsername]
  );

  return { joinRoom, error };
}
