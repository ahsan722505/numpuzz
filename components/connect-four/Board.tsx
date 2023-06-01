import React, { useCallback, useEffect } from "react";
import styles from "./Board.module.scss";
import { Util } from "../../helpers/connect-four/util";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { detach, emit, listen } from "../../websocket";
import useConnectFourStore from "../../store/connect-four";
const Board = ({ resetBoard }) => {
  const waitingForOpponent = useConnectFourStore(
    (state) => state.waitingForOpponent
  );
  const setCurrentPlayer = useConnectFourStore(
    (state) => state.setCurrentPlayer
  );
  const updateTimer = useConnectFourStore((state) => state.updateTimer);
  const opponent = useConnectFourStore((state) => state.opponent);
  const self = useConnectFourStore((state) => state.self);
  const router = useRouter();
  const { roomId } = router.query;
  const gameDim = 6;
  const [board, setBoard] = useState(() => Util.readBoardFromDisk(gameDim));
  const boardRef = useRef(board);
  const currentPlayer = useConnectFourStore((state) => state.currentPlayer);
  console.log("currentPlayer", currentPlayer);
  console.log("board", board);
  const updateCurrentPlayer = useConnectFourStore(
    (state) => state.updateCurrentPlayer
  );
  const endGame = useConnectFourStore((state) => state.endGame);
  const MyTurn = () => self?.gameId === currentPlayer;
  const dropDisk = useCallback(
    (col) => {
      Util.saveBoardToDisk(boardRef.current, currentPlayer, col);
      let i = 0;
      const id = setInterval(() => {
        if (
          (boardRef.current[i] && boardRef.current[i][col] > 0) ||
          i === board.length
        ) {
          clearInterval(id);
          if (Util.checkWin(boardRef.current, currentPlayer)) {
            emit("saveState", {
              boardState: boardRef.current,
              currentPlayer,
              startTime: "",
              roomId,
            });
            if (MyTurn()) endGame("won");
            else endGame("lost");
            return;
          }
          updateCurrentPlayer(boardRef.current, roomId.toString());
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
    if (resetBoard > 0) {
      const newBoard = Util.CreateBoard(gameDim);
      setBoard(newBoard);
      boardRef.current = newBoard;
    }
  }, [resetBoard]);

  useEffect(() => {
    listen("oppturn", (data) => dropDisk(data));
    listen("syncState", (data) => {
      console.log("syncState", data);
      setBoard(data.boardState);
      boardRef.current = data.boardState;
      setCurrentPlayer(data.currentPlayer);
      updateTimer(data.currentPlayer, data.startTime);
    });
    return () => {
      detach("oppturn");
      detach("syncState");
    };
  }, [dropDisk]);

  const turnHandler = (cellInd) => {
    if (!MyTurn() || waitingForOpponent) return;
    emit("myturn", { cellInd, roomId, oppId: opponent.userId });
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
