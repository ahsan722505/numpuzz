import React from 'react'
import styles from "./Levels.module.scss"
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
const Levels = () => {
    const {startGame,other,play}=useContext(GameContext);
    if(typeof window !== 'undefined'){
      var elem = document.documentElement;
      function openFullscreen() {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
      }
    }
    
  return (
    <ul className={styles.levels}>
        {[3,4,5,6,7,8].map(each=><li key={each} onClick={()=> {
          if(play) other.play();
          startGame(each);
          openFullscreen();
        }}>{each}x{each}</li>)}
    </ul>
  )
}

export default Levels