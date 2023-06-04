import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useConnectFourStore from "../../store/connect-four";
import { emit, listen } from "../../websocket";
import { useRouter } from "next/router";

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState("");
  const setMessage = useConnectFourStore((state) => state.setMessage);
  const opponent = useConnectFourStore((state) => state.opponent);
  const router = useRouter();
  const selfIntervalRef = useRef<NodeJS.Timer>(null);
  const opponentIntervalRef = useRef<NodeJS.Timer>(null);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (messageInput.trim().length === 0) return;
    clearTimeout(selfIntervalRef.current);
    setMessage({ message: messageInput, type: "self" });
    emit("sendMessage", {
      message: messageInput,
      oppId: opponent.userId,
      roomId: router.query.roomId,
    });
    selfIntervalRef.current = setTimeout(() => {
      setMessage({ message: "", type: "self" });
    }, 5000);
    setMessageInput("");
  };

  useEffect(() => {
    listen("receiveMessage", (data) => {
      console.log("data", data);
      clearTimeout(opponentIntervalRef.current);
      setMessage({ message: data, type: "opponent" });
      opponentIntervalRef.current = setTimeout(() => {
        setMessage({ message: "", type: "opponent" });
      }, 5000);
    });
  }, []);
  return (
    <form onSubmit={sendMessageHandler} className="flex justify-start w-full">
      <Input
        className="w-2/6 md:w-1/6"
        placeholder="Enter Message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <Button className="ml-2" type="primary" htmlType="submit">
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
