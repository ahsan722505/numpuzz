import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from "./Volume.module.scss";
import { faVolumeUp,faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../reduxStore/NumberRiddleSlice';
const Volume = () => {
  // const {other,play,toggleSound}=useContext(GameContext);
  const {other,play}=useSelector(state=>state.numberRiddle);
  const dispatch=useDispatch();
  const volumeHandler=()=>{
    if(play){
      other.currentTime=0;
      other.play();
    }
    // toggleSound();
    dispatch(toggleSound());
  }
  return (
    <div onClick={volumeHandler} className={`${styles.volume} pointer`}>
      { play && <FontAwesomeIcon icon={faVolumeUp} />}
      { !play && <FontAwesomeIcon icon={faVolumeMute} />}

      </div>
  )
}

export default Volume