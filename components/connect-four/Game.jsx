import React from "react";
import Board from "./Board";
import styles from "./Game.module.scss";

const Game = () => {
  return (
    <div className={styles.game}>
      <Board />
    </div>
  );
};

export default Game;
