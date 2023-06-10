import React, { useCallback, useEffect } from "react";
import { Util } from "../../helpers/connect-four/util";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { detach, emit, listen } from "../../websocket";
import useConnectFourStore from "../../store/connect-four";
import { getOptimalMove } from "../../helpers/connect-four/minimax";

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
  const blockUserInteraction = useRef(false);
  const { roomId } = router.query;
  const gameDim = 6;
  const sound = new Audio("/touch.wav");
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
  const gameMode = roomId === "bot" ? "bot" : "friend";
  const dropDisk = useCallback(
    (col) => {
      let i = 0;
      const id = setInterval(() => {
        if (
          (boardRef.current[i] && boardRef.current[i][col] > 0) ||
          i === board.length
        ) {
          sound.play().catch((err) => console.log(err));
          clearInterval(id);
          if (Util.checkWin(boardRef.current, currentPlayer)) {
            emit("saveState", {
              boardState: boardRef.current,
              currentPlayer,
              startTime: "",
              roomId,
            });
            if (MyTurn()) endGame("won", gameMode);
            else endGame("lost", gameMode);
            return;
          }
          if (Util.checkDraw(boardRef.current)) {
            emit("saveState", {
              boardState: boardRef.current,
              currentPlayer,
              startTime: "",
              roomId,
            });
            endGame("tie", gameMode);
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
    listen("oppturn", (data) => {
      const move = Util.saveBoardToDisk(boardRef.current, currentPlayer, data);
      if (move === "invalid") return;
      dropDisk(data);
    });
    listen("syncState", (data) => {
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

  if (!MyTurn()) {
    console.log("push");
    blockUserInteraction.current = false;
  }

  const turnHandler = (cellInd) => {
    if (blockUserInteraction.current || !MyTurn() || waitingForOpponent) return;
    blockUserInteraction.current = true;
    const move = Util.saveBoardToDisk(boardRef.current, currentPlayer, cellInd);
    if (move === "invalid") {
      blockUserInteraction.current = false;
      return;
    }
    emit("myturn", { cellInd, roomId, oppId: opponent.userId });
    dropDisk(cellInd);
  };

  useEffect(() => {
    if (currentPlayer === 2 && roomId === "bot") {
      // bot's turn
      const col = getOptimalMove(Util.createCopy(boardRef.current));
      const move = Util.saveBoardToDisk(boardRef.current, currentPlayer, col);
      if (move === "invalid") return;
      setTimeout(() => {
        dropDisk(col);
      }, 3000);
    }
  }, [currentPlayer, roomId]);

  return (
    <div className="bg-darkPurple h-[95vmin] w-[95vmin] sm:h-[70vmin] sm:w-[70vmin]">
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
                  className="cursor-pointer h-full inline-block p-1"
                  onClick={() => turnHandler(cellInd)}
                >
                  <div
                    className="w-full h-full rounded-[2.5rem]"
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
