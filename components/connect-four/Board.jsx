import React from "react";
import styles from "./Board.module.scss";
import { Util } from "../../helpers/connect-four/util";
import { useState } from "react";
const Board = () => {
  const gameDim = 6;
  const spacing = 2;
  const [board, setBoard] = useState(() => Util.CreateBoard(gameDim));

  return (
    <div className={styles.board} onClick={(e) => console.log(e)}>
      {board.map((eachRow, rowInd) => {
        return (
          <div
            key={rowInd}
            style={{
              height: `${100 / gameDim - spacing - spacing / gameDim}%`,
              marginBottom: `${spacing}%`,
              marginTop: rowInd === 0 && `${spacing}%`,
            }}
          >
            {eachRow.map((_, cellInd) => {
              return (
                <div
                  style={{
                    width: `${100 / gameDim - spacing - spacing / gameDim}%`,
                    marginRight: `${spacing}%`,
                    marginLeft: cellInd === 0 && `${spacing}%`,
                    backgroundColor: cellInd === 2 && "black",
                  }}
                  key={cellInd}
                  className={styles.cell}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
