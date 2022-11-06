import React, { useCallback, useEffect } from "react";
import styles from "./Board.module.scss";
import { Util } from "../../helpers/connect-four/util";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const playerMap = { 1: 2, 2: 1 };
const Board = ({ currentPlayer, setCurrentPlayer }) => {
  const { socket, opponent } = useSelector((state) => state.connectFour);
  const router = useRouter();
  const { roomId } = router.query;
  const gameDim = 6;
  const [board, setBoard] = useState(() => Util.CreateBoard(gameDim));
  const boardRef = useRef(board);
  const dropDisk = useCallback(
    (col) => {
      let i = 0;
      const id = setInterval(() => {
        console.log(currentPlayer);
        if (
          (boardRef.current[i] && boardRef.current[i][col] > 0) ||
          i === board.length
        ) {
          clearInterval(id);
          if (Util.checkWin(boardRef.current, currentPlayer))
            alert(`player ${currentPlayer} win`);
          setCurrentPlayer(playerMap[currentPlayer]);
          return;
        }
        const newBoard = Util.createCopy(boardRef.current);
        newBoard[i][col] = currentPlayer;
        if (newBoard[i - 1]) newBoard[i - 1][col] = 0;
        boardRef.current = newBoard;
        setBoard(newBoard);
        i++;
      }, 50);
    },
    [currentPlayer]
  );

  useEffect(() => {
    if (socket) {
      socket.on("oppturn", (cellInd) => {
        dropDisk(cellInd);
      });
      return () => {
        socket.off("oppturn");
      };
    }
  }, [socket, dropDisk]);
  const turnHandler = (cellInd) => {
    socket.emit("myturn", { socketId: opponent.id, cellInd });
    dropDisk(cellInd);
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
                  onClick={() => turnHandler(cellInd)}
                >
                  <div
                    className={styles.circle}
                    style={{
                      backgroundColor: Util.getColor(eachCell),
                    }}
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
