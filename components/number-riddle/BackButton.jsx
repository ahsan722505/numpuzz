import React from 'react';
import styles from "./BackButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import GameContext from "../../store/number-riddle/GameContext";
const BackButton = () => {
    const {endGame,play,other}=useContext(GameContext);
  return (
    <button className={`${styles.back} pointer`} onClick={()=>{
      if(play) other.play();
      endGame();
      }}>
        <FontAwesomeIcon  icon={faAngleLeft}/>
    </button>
  )
}

export default BackButton