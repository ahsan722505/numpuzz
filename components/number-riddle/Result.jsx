import Modal from '@mui/material/Modal';
import { faClock, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./Result.module.scss"
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
const Result = ({playAgainHandler,timeTaken}) => {
  const {best,gameDim,endGame,other,play}=useContext(GameContext);
  return (
    <Modal className={styles.result}  open={true}>
        <div  className={styles.box}>
                <h1>Complete</h1>
                <h2><FontAwesomeIcon icon={faClock}/> <span>Time: {timeTaken}</span></h2>
                <h3><FontAwesomeIcon icon={faCrown}/> <span>Best: {best[gameDim].d}</span></h3>
                <div>
                    <button onClick={()=>{
                      if(play){
                        other.currentTime=0;
                        other.play();
                      }
                      playAgainHandler();
                    }} className="pointer"><FontAwesomeIcon icon={faArrowRotateRight}/></button>
                    <button onClick={()=>{
                      if(play){
                        other.currentTime=0;
                        other.play();
                      }
                      endGame();
                    }} className="pointer"><FontAwesomeIcon icon={faHouse}/></button>
                </div>
        </div>
    </Modal>
  )
}

export default Result