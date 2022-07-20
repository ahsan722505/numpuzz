import React from 'react'
import Time from './Time'
import Reset from './Reset'
import styles from "./SecondLayer.module.scss"
const SecondLayer = ({setResetGame,resetGame,gameWon,setTimeTaken,recordTime}) => {
  return (
    <div className={styles.layer}>
        <Time recordTime={recordTime} resetGame={resetGame} gameWon={gameWon} setTimeTaken={setTimeTaken}/>
        <Reset setResetGame={setResetGame}/>
    </div>
  )
}

export default SecondLayer