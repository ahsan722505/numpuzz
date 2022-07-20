import { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
const Time = ({resetGame,setTimeTaken,recordTime}) => {
    const {setBestHandler,best,gameDim}=useContext(GameContext)
    const [duration,setDuration]=useState("00:00");
    const startingTime=useRef(new Date());
    const intervalId=useRef(null);
    const leaveTime=useRef(null);
    const calculateTime = () => {
        const total = Date.parse(new Date()) - Date.parse(startingTime.current);
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            hours, minutes, seconds
        };
    }
    const timer=()=>{
      if(document.visibilityState === "hidden") return;  
        let {hours, minutes, seconds } 
        = calculateTime();
            setDuration(
                hours > 0 ? `${(hours > 9 ? hours : '0' + hours) + ':'}` : "" +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
            
    
  }
  const tabHandler=(e)=>{
    if(document.visibilityState === "hidden") leaveTime.current=e.timeStamp;
    else startingTime.current= new Date(startingTime.current.getTime() + (e.timeStamp-leaveTime.current));
  }
  useEffect(()=>{
    intervalId.current=setInterval(timer,1000);
    document.addEventListener("visibilitychange", tabHandler)
    return ()=>{
      clearInterval(intervalId.current);
      document.removeEventListener("visibilitychange", tabHandler)
    }
  },[])
  // This effect runs when game is reset
  useEffect(()=>{
    if(resetGame){ 
      startingTime.current=new Date();
      setDuration("00:00");
      intervalId.current=setInterval(timer,1000);
    }
    return ()=>{
      clearInterval(intervalId.current);
    }
  },[resetGame]);
  // This effect runs when puzzle is solved and we need to record time
  useEffect(()=>{
    if(recordTime){
        clearInterval(intervalId.current);
        setTimeTaken(duration);
        // setting best time
        const newBest={...best}
        if(!best[gameDim]){
            newBest[gameDim]= {m : new Date() - startingTime.current , d: duration};
            setBestHandler(newBest);
        }else if((new Date() - startingTime.current) < best[gameDim].m){
          newBest[gameDim]= {m : new Date() - startingTime.current , d: duration};
          setBestHandler(newBest);
        }

    }
  },[recordTime,duration,best,gameDim]);
  return (
    <div>{duration}</div>
  )
}

export default Time