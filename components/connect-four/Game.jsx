import React, { useEffect, useState } from "react";
import Board from "./Board";
import styles from "./Game.module.scss";
import FirstRow from "./FirstRow";
import { useSelector } from "react-redux";
import Result from "./Result";
const Game = () => {
  const { opponent, self } = useSelector((state) => state.connectFour);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [showResult, setShowResult] = useState(true);
  const toggleResult = () => setShowResult((prev) => !prev);
  // current player is player who is playing the game
  useEffect(() => {
    if (opponent && self) {
      // host will have first turn
      setCurrentPlayer(self.host ? self.playId : opponent.playId);
    }
  }, [opponent, self]);
  return (
    <div className={styles.game}>
      <FirstRow currentPlayer={currentPlayer} />
      <Board
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
      {showResult && (
        <Result showResult={showResult} toggleResult={toggleResult} />
      )}
    </div>
  );
};

export default Game;
