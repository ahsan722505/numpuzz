import React from 'react'
import styles from "./Levels.module.scss"
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
import BackButton from './BackButton';
const Levels = () => {
    const {startGame,other,play}=useContext(GameContext);
  return (
    <div className={styles.levels}>
        <div><BackButton home={true} /></div>
        <div>
            <h1>Select Size of puzzle</h1>
            <ul>
            {[3,4,5,6,7,8].map(each=><li key={each} onClick={()=> {
              if(play) other.play();
              startGame(each);
            }}>{each}x{each}</li>)}
        </ul>
        </div>
        
    </div>
    
  )
}

export default Levels