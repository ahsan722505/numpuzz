import React, { useState } from "react";
import Board from "./Board";
import FirstLayer from "./FirstLayer";
import SecondLayer from "./SecondLayer";
import styles from "./Game.module.scss";
import Result from "./Result";
import Button from "./Button";
import { openFullscreen } from "../../helpers/number-riddle/util";
import { useSelector } from "react-redux";
const Game = () => {
  const { play, other } = useSelector((state) => state.numberRiddle);
  const [startGame, setStartGame] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [resetGame, setResetGame] = useState(0);
  const [timeTaken, setTimeTaken] = useState(null);
  const [recordTime, setRecordTime] = useState(false);
  const playAgainHandler = () => {
    setResetGame((state) => state + 1);
    setGameWon(false);
    setRecordTime(false);
  };

  return (
    <div className={styles.Game}>
      <FirstLayer />
      {!startGame && <h1 className="text-3xl font-bold">Target pattern</h1>}
      {startGame && (
        <SecondLayer
          recordTime={recordTime}
          gameWon={gameWon}
          setTimeTaken={setTimeTaken}
          resetGame={resetGame}
          setResetGame={setResetGame}
        />
      )}
      <Board
        setRecordTime={setRecordTime}
        setGameWon={setGameWon}
        resetGame={resetGame}
        startGame={startGame}
      />
      {!startGame && (
        <Button
          onClick={() => {
            if (play) {
              other.currentTime = 0;
              other.play();
            }
            openFullscreen();
            setStartGame(true);
          }}
        >
          Start
        </Button>
      )}
      {gameWon && (
        <Result timeTaken={timeTaken} playAgainHandler={playAgainHandler} />
      )}
    </div>
  );
};
export default Game;
