import React from "react";
import styles from "./Board.module.scss";
import { Util } from "../../helpers/connect-four/util";
import { useState } from "react";
import { useRef } from "react";
const Board = () => {
  const gameDim = 6;
  const [board, setBoard] = useState(() => Util.CreateBoard(gameDim));
  const boardRef = useRef(board);
  const dropDisk = (col) => {
    let i = 0;
    const id = setInterval(() => {
      console.log(boardRef.current);
      if (
        (boardRef.current[i] && boardRef.current[i][col] === 1) ||
        i === board.length
      ) {
        clearInterval(id);
        return;
      }
      const newBoard = Util.createCopy(boardRef.current);
      newBoard[i][col] = 1;
      if (newBoard[i - 1]) newBoard[i - 1][col] = 0;
      boardRef.current = newBoard;
      setBoard(newBoard);
      i++;
    }, 50);
  };

  return (
    <div className={styles.board} onClick={(e) => console.log(e)}>
      {board.map((eachRow, rowInd) => {
        return (
          <div
            key={rowInd}
            style={{
              height: `${100 / gameDim}%`,
            }}
          >
            {eachRow.map((eachCell, cellInd) => {
              return (
                <div
                  style={{
                    width: `${100 / gameDim}%`,
                  }}
                  key={cellInd}
                  className={styles.cell}
                  onClick={() => dropDisk(cellInd)}
                >
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: eachCell === 1 && "black" }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
