import React, { useEffect, useState} from 'react';
// import tileSrc from "../../public/touch.wav";
// import otherSrc from "../../public/other.mp3";
const GameContext = React.createContext({
  showGame: false,
  gameDim : 3,
  startGame: (_) => {},
  endGame: (_) => {},
  setBestHandler: (_) => {},
  best : {},
  play : true,
  tile : {},
  other : {},
  toggleSound : ()=>{},
});
export const GameContextProvider = (props) => {
    const [showGame,setShowGame]=useState(false);
    const [gameDim,setGameDim]=useState(3);
    const [best,setBest]=useState();
    const [tile,setTile]=useState();
    const [other,setOther]=useState();
    const [play,setPlay]=useState();
    useEffect(()=>{
      setBest(JSON.parse(localStorage.getItem("best")) || {});
      setPlay((localStorage.getItem("sound") === null || localStorage.getItem("sound") === "true") ? true : false );
      setTile(new Audio("/touch.wav"));
      setOther(new Audio("/other.wav"));
    },[])
    const startGame=(gameDim)=>{
        setShowGame(true);
        setGameDim(gameDim);
    }
    const endGame=()=>{
      setShowGame(false);
  }
  const setBestHandler=(newBest)=>{
    setBest(newBest);
    localStorage.setItem("best",JSON.stringify(newBest))
  }
  const toggleSound=()=>{
    setPlay(state=>{ 
      localStorage.setItem("sound",`${!state}`)
      return !state
    });
  }
  return (
    <GameContext.Provider
      value={{
        showGame,
        gameDim,
        startGame,
        endGame,
        best,
        setBestHandler,
        tile,
        other,
        play,
        toggleSound
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
};

export default GameContext;