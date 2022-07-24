import React, { useState } from 'react'
import Board from './Board'
import FirstLayer from './FirstLayer'
import SecondLayer from './SecondLayer'
import styles from "./Game.module.scss"
import Result from './Result'
import { useContext } from 'react';
import Button from "./Button";
import GameContext from "../../store/number-riddle/GameContext";
import { openFullscreen } from "../../helpers/number-riddle/util";
 const Game = () => {
    const {play,other}=useContext(GameContext);
     const [startGame,setStartGame]=useState(false);
     const [gameWon,setGameWon]=useState(false);
     const [resetGame,setResetGame]=useState(0);
     const [timeTaken,setTimeTaken]=useState(null);
     const [recordTime,setRecordTime]=useState(false);
     const playAgainHandler=()=>{
         setResetGame(state=>state+1);
         setGameWon(false);
         setRecordTime(false);
     }
     
  return (
      <div className={styles.Game}>
            <FirstLayer/>
            { !startGame && <h1>Target pattern</h1>}
            { startGame && <SecondLayer recordTime={recordTime} gameWon={gameWon} setTimeTaken={setTimeTaken} resetGame={resetGame} setResetGame={setResetGame}/>}
            <Board setRecordTime={setRecordTime}  setGameWon={setGameWon} resetGame={resetGame} startGame={startGame}/>
            { !startGame && <Button onClick={()=> {
                if(play) other.play();
                openFullscreen();
                setStartGame(true)
            }}>Start</Button>}
            {gameWon && <Result  timeTaken={timeTaken}  playAgainHandler={playAgainHandler}/>}
      </div>    
  )
}
export default Game;
