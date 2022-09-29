import React from "react";
import styles from "./Board.module.scss";
import { Util } from "../../helpers/connect-four/util";
import { useState } from "react";
const Board = () => {
  const gameDim = 6;
  const [board, setBoard] = useState(() => Util.CreateBoard(gameDim));

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
            {eachRow.map((_, cellInd) => {
              return (
                <div
                  style={{
                    width: `${100 / gameDim}%`,
                  }}
                  key={cellInd}
                  className={styles.cell}
                >
                  <div className={styles.circle} />
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
