import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from "./Volume.module.scss";
import { faVolumeUp,faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
const Volume = () => {
  const {other,play,toggleSound}=useContext(GameContext);
  const volumeHandler=()=>{
    if(play){
      other.currentTime=0;
      other.play();
    }
    toggleSound();
  }
  return (
    <div onClick={volumeHandler} className={`${styles.volume} pointer`}>
      { play && <FontAwesomeIcon icon={faVolumeUp} />}
      { !play && <FontAwesomeIcon icon={faVolumeMute} />}

      </div>
  )
}

export default Volume