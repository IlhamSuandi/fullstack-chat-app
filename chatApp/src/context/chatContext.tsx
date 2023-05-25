"use client";
import React from "react";
import io from "socket.io-client";

export const SocketProvider = React.createContext<any>(null);

export const socket = io("ws://192.168.1.2:5000", {
  transports: ["websocket"],
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chat, setChat] = React.useState<Array<any>>([]);
  const [username, setUsername] = React.useState<string>("");

  React.useEffect(() => {
    socket.emit("chat", 1, "ilham suandi");
    socket.on("user-join", (data) => console.log(data));
  }, []);

  const sendMessage = (roomId: string, username: string, messages: string) => {
    socket.emit("chat-message", roomId, username, messages);
  };

  return (
    <SocketProvider.Provider
      value={{
        sendMessage,
        chat,
        setChat,
        username,
        setUsername,
      }}
    >
      {children}
    </SocketProvider.Provider>
  );
}
