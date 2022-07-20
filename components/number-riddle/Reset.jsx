import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from "./Reset.module.scss"
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";

const Reset = ({setResetGame}) => {
  const {other,play}=useContext(GameContext);
  return (
    <div className={`${styles.reset} pointer`} onClick={()=>{
        if(play) other.play();
       setResetGame(state=> state + 1)}}>
        <FontAwesomeIcon icon={faArrowsRotate}/>
    </div>
  )
}

export default Reset