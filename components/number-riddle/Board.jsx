import React, { useEffect, useRef } from 'react'
import styles from "./Board.module.scss"
import { CreateBoard,move,checkWin,openFullscreen } from "../../helpers/number-riddle/util";
import { useState } from 'react';
import { useContext } from 'react'
import GameContext from "../../store/number-riddle/GameContext";
const Board = ({startGame,resetGame,setGameWon,setRecordTime}) => {
    console.log("re-render");
    const {gameDim,tile,play}=useContext(GameContext);
    const [board,setBoard]=useState(()=>CreateBoard(gameDim,startGame));
    const endRef=useRef(false);
    const pause=useRef(false);
    const [moveAble,setMoveAble]=useState({elements : [],cls : null});
    // board and internal board should always sync with each other
    const internalBoard=useRef(board);
    const clickHandler= (e,pos)=>{
        if(pause.current) return;
        if(e.type === "click" && ('ontouchstart' in document.documentElement)) return;
        if(!startGame || endRef.current) return;
        if(!document.fullscreenElement) openFullscreen(); 
        if(play){
            tile.currentTime=0;
            tile.play();
        }
        const {updatedBoard,possible,items,direction}=move(pos,internalBoard.current,styles,gameDim);
        if(!possible) return;
        setMoveAble({elements : items,cls : direction});
        pause.current=true;
        endRef.current=checkWin(updatedBoard);
        if(endRef.current) setRecordTime(true);
        internalBoard.current=updatedBoard;
        setTimeout(()=>{
            pause.current=false;
            setBoard(updatedBoard);
            setMoveAble({elements: [],cls : null})
            if(endRef.current) setGameWon(true);
        },120);
        

    }
    useEffect(()=>{
        // creating board for user to play on startgane or reset game
        if(startGame || resetGame){
            let b=CreateBoard(gameDim,startGame);
            setBoard(b);
            internalBoard.current=b;
            endRef.current=false;
        }
    },[startGame,resetGame])
  return (
        
            <div id="board" className={styles.board} >
                {board.map((eachRow,rowInd)=>{
                    return(
                        <div key={rowInd} style={{height : `${100/gameDim}%`}} >
                            {eachRow.map((eachCell,cellInd)=>{
                                return(
                                    <div  id={eachCell}    onClick={(e)=>clickHandler(e,[rowInd,cellInd])} onTouchStart={(e)=>clickHandler(e,[rowInd,cellInd])}     key={cellInd} className={`${styles.cell} ${eachCell !== 0 && styles.bg} ${moveAble.elements[eachCell]=== 1 && moveAble.cls} pointer`} style={{width : `${100/gameDim}%`}}><span style={{fontSize : `${15/gameDim}rem`}}>{eachCell}</span></div>
                                )
                            })}
                        </div>
                    )
                })}

            </div>
        
     
  )
}

export default Board