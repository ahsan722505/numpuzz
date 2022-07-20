import React from 'react';
import styles from "./BackButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import GameContext from "../../store/number-riddle/GameContext";
import { useRouter } from 'next/router';
const BackButton = ({home}) => {
    const {endGame,play,other}=useContext(GameContext);
    const router=useRouter();
  return (
    <button className={`${styles.back} pointer`} onClick={()=>{
      if(play) other.play();
      if(home) router.replace("/");
      else endGame();
      }}>
        <FontAwesomeIcon  icon={faAngleLeft}/>
    </button>
  )
}

export default BackButton