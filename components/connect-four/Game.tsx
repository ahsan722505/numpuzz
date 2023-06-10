import React, { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import FirstRow from "./FirstRow";
import Result from "./Result";
import { useRouter } from "next/router";
import { emit } from "../../websocket";
import useConnectFourStore from "../../store/connect-four";
import { Button, Input } from "antd";
import MessageInput from "./MessageInput";
import CopyLink from "./CopyLink";
const Game = () => {
  const opponent = useConnectFourStore((state) => state.opponent);
  const flushState = useConnectFourStore((state) => state.flushState);
  const resultStatus = useConnectFourStore((state) => state.resultStatus);
  const setResultStatus = useConnectFourStore((state) => state.setResultStatus);
  const startGame = useConnectFourStore((state) => state.startGame);
  const [resetBoard, setResetBoard] = useState(0);
  const router = useRouter();
  const { roomId } = router.query;
  const playAgain = () => {
    setResultStatus("");
    setResetBoard((prev) => prev + 1);
    emit("playAgainRequest", { oppId: opponent.userId, roomId });
    if (roomId === "bot") startGame();
  };

  const LeaveGame = () => {
    if (opponent) emit("leaveGame", { oppId: opponent.userId, roomId });
    router.push("/connect-four");
    flushState();
    localStorage.removeItem("connectFourBoard");
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        LeaveGame();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router, LeaveGame]);

  return (
    <>
      <Button className="mt-2 ml-2" danger onClick={LeaveGame}>
        Leave Game
      </Button>
      {roomId !== "bot" && <MessageInput />}
      <div className="w-screen h-[75vh] md:h-[92vh] flex justify-center items-center flex-col">
        <FirstRow />
        <Board resetBoard={resetBoard} />
        {resultStatus && <Result playAgain={playAgain} leaveGame={LeaveGame} />}
        <CopyLink />
      </div>
    </>
  );
};

export default Game;
