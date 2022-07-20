import React from 'react'
import BackButton from './BackButton'
import Volume from './Volume'
import styles from "./FirstLayer.module.scss"
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
const FirstLayer = () => {
  const {gameDim}=useContext(GameContext);
  return (
    <div className={styles.firstLayer}>
        <BackButton/>
        <div>{gameDim}x{gameDim}</div>
        <Volume/>
    </div>
  )
}

export default FirstLayer