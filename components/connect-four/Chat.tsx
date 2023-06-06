import { Tooltip } from "antd";
import React from "react";

const Chat = ({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) => {
  return (
    <Tooltip
      color="white"
      style={{ marginTop: "-50px" }}
      placement="bottomLeft"
      title={<p className="text-darkPurple">{message}</p>}
      open={Boolean(message)}
    >
      {children}
    </Tooltip>
  );
};

export default Chat;
