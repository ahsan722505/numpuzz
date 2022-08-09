import React from 'react';
import styles from "./BackButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import GameContext from "../../store/number-riddle/GameContext";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { endGame } from '../../reduxStore/NumberRiddleSlice';
const BackButton = ({home}) => {
    // const {endGame,play,other}=useContext(GameContext);
    const {play,other}=useSelector(state=>state.numberRiddle);
    const dispatch=useDispatch();
    const router=useRouter();
  return (
    <button className={`${styles.back} pointer`} onClick={()=>{
      if(play){
        other.currentTime=0;
        other.play();
      } 
      if(home) router.replace("/");
      else dispatch(endGame());
      }}>
        <FontAwesomeIcon  icon={faAngleLeft}/>
    </button>
  )
}

export default BackButton