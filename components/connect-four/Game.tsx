import React, { useEffect, useState } from "react";
import Board from "./Board";
import styles from "./Game.module.scss";
import FirstRow from "./FirstRow";
import Result from "./Result";
import { useRouter } from "next/router";
import { detach, emit, listen } from "../../websocket";
import useConnectFourStore from "../../store/connect-four";
import useGlobalStore from "../../store/global";
const Game = () => {
  const self = useConnectFourStore((state) => state.self);
  const opponent = useConnectFourStore((state) => state.opponent);
  const setWaitingForOpponent = useConnectFourStore(
    (state) => state.setWaitingForOpponent
  );
  const flushState = useConnectFourStore((state) => state.flushState);
  const setNotification = useGlobalStore((state) => state.setNotification);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(null);
  const [resetBoard, setResetBoard] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();
  const { roomId } = router.query;
  const toggleResult = () => setShowResult((prev) => !prev);
  const MyTurn = () => self?.gameId === currentPlayer;
  const playAgain = () => {
    toggleResult();
    setCurrentPlayer(self.host ? self.gameId : opponent.gameId);
    setResetBoard((prev) => prev + 1);
    emit("playAgainSignal", { oppId: opponent.userId, roomId });
  };
  const LeaveGame = () => {
    emit("leaveGame", { oppId: opponent.userId, roomId });
    router.push("/connect-four");
    flushState();
  };
  // current player is player who is playing the game
  useEffect(() => {
    if (opponent && self) {
      // host will have first turn
      setCurrentPlayer(self.host ? self.gameId : opponent.gameId);
    }
  }, [opponent?.userId, self?.host, self?.userId]);

  useEffect(() => {
    if (opponent) {
      listen("playAgainSignal", () => {
        setNotification({
          message: `${opponent.username} wants to play Again.`,
        });
        setWaitingForOpponent(false);
      });
      listen("leaveGame", () => {
        setNotification({
          message: `${opponent.username} left the game.`,
        });
        router.push("/connect-four");
        flushState();
      });
    }
    return () => {
      detach("playAgainSignal");
      detach("leaveGame");
    };
  }, [opponent]);

  return (
    <div className={styles.game}>
      <FirstRow
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
      <Board
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        toggleResult={toggleResult}
        MyTurn={MyTurn}
        resetBoard={resetBoard}
        setResetBoard={setResetBoard}
      />
      {showResult && (
        <Result
          MyTurn={MyTurn}
          showResult={showResult}
          toggleResult={toggleResult}
          playAgain={playAgain}
          LeaveGame={LeaveGame}
        />
      )}
    </div>
  );
};

export default Game;
