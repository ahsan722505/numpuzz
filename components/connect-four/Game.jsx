import React, { useEffect, useState } from "react";
import Board from "./Board";
import styles from "./Game.module.scss";
import FirstRow from "./FirstRow";
import { useDispatch, useSelector } from "react-redux";
import Result from "./Result";
import {
  flushState,
  setWaitingForOpponent,
} from "../../reduxStore/ConnectFourSlice";
import { setNotification } from "../../reduxStore/globalSlice";
import Router, { useRouter } from "next/router";
const Game = () => {
  const { opponent, self, socket } = useSelector((state) => state.connectFour);
  const dispatch = useDispatch();
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [resetBoard, setResetBoard] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();
  const toggleResult = () => setShowResult((prev) => !prev);
  const MyTurn = () => self?.playId === currentPlayer;
  const playAgain = () => {
    toggleResult();
    setCurrentPlayer(self.host ? self.playId : opponent.playId);
    setResetBoard((prev) => prev + 1);
    socket.emit("playAgainSignal", opponent.id);
  };
  const LeaveGame = () => {
    socket.emit("leaveGame", opponent.id);
    router.push("/connect-four");
    dispatch(flushState());
  };
  // current player is player who is playing the game
  useEffect(() => {
    if (opponent && self) {
      // host will have first turn
      setCurrentPlayer(self.host ? self.playId : opponent.playId);
    }
  }, [opponent?.playId, self?.host, self?.playId]);
  useEffect(() => {
    if (socket && opponent) {
      socket.on("playAgainSignal", () => {
        dispatch(
          setNotification({
            message: `${opponent.username} wants to play Again.`,
          })
        );
        dispatch(setWaitingForOpponent(false));
      });
      socket.on("leaveGame", () => {
        dispatch(
          setNotification({ message: `${opponent.username} left the game.` })
        );
        router.push("/connect-four");
        dispatch(flushState());
      });
      return () => {
        socket.off("playAgainSignal");
        socket.off("leaveGame");
      };
    }
  }, [socket, opponent]);
  return (
    <div className={styles.game}>
      <FirstRow currentPlayer={currentPlayer} />
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
