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
    <Tooltip placement="bottomLeft" title={message} open={Boolean(message)}>
      {children}
    </Tooltip>
  );
};

export default Chat;
