import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useConnectFourStore from "../../store/connect-four";
import { emit, listen } from "../../websocket";
import { useRouter } from "next/router";
import Button from "../../components/number-riddle/Button";

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState("");
  const setMessage = useConnectFourStore((state) => state.setMessage);
  const opponent = useConnectFourStore((state) => state.opponent);
  const router = useRouter();
  const selfIntervalRef = useRef<NodeJS.Timer>(null);
  const opponentIntervalRef = useRef<NodeJS.Timer>(null);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (messageInput.trim().length === 0 || !opponent) return;
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
    <form
      onSubmit={sendMessageHandler}
      className="flex justify-center w-full mt-6"
    >
      <Input
        className="w-3/4 md:w-[30%]"
        placeholder="Enter Message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <Button
        type="submit"
        style={{
          padding: ".3rem .8rem",
          fontSize: ".8rem",
          marginLeft: "1rem",
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
