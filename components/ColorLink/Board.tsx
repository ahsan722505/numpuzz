import React, { useRef, useState } from "react";
import { Util } from "./Util";
export enum CellColor {
  red = "red",
  purple = "purple",
  yellow = "yellow",
  green = "green",
  white = "white",
  empty = "",
}
export type Cell = {
  cellType: "Path" | "Terminal";
  cellColor: CellColor;
};
const Board = () => {
  const [board, setBoard] = useState<Cell[][]>(() => Util.createBoard(6));
  const fillingInfo = useRef<CellColor | null>(null);
  const cellsStack = useRef<[number, number][]>([]);

  const handleMouseDown = (rowInd: number, cellInd: number, e, cell: Cell) => {
    e.preventDefault();
    fillingInfo.current = cell.cellColor;
  };

  const handleMouseEnter = (rowInd: number, cellInd: number, cell: Cell) => {
    if (
      board[rowInd][cellInd].cellColor === fillingInfo.current &&
      board[rowInd][cellInd].cellType === "Path"
    ) {
      const newBoard = Util.createCopy(board);
      console.log("inside if");
      while (
        cellsStack.current[cellsStack.current.length - 1][0] !== rowInd ||
        cellsStack.current[cellsStack.current.length - 1][1] !== cellInd
      ) {
        console.log("inside loop");
        const [row, cell] = cellsStack.current.pop();
        newBoard[row][cell].cellColor = CellColor.empty;
      }
      setBoard(newBoard);
      return;
    }
    if (
      !fillingInfo.current ||
      cell.cellType === "Terminal" ||
      !isAdjacentToPreviousCell(rowInd, cellInd)
    )
      return;
    const newBoard = Util.createCopy(board);
    newBoard[rowInd][cellInd].cellColor = fillingInfo.current;
    cellsStack.current.push([rowInd, cellInd]);
    setBoard(newBoard);
  };

  const handleMouseUp = (rowInd: number, cellInd: number, e) => {
    fillingInfo.current = null;
    cellsStack.current = [];
  };
  function isAdjacentToPreviousCell(rowInd: number, cellInd: number) {
    if (cellsStack.current.length === 0) return true;
    const [prevRowInd, prevCellInd] =
      cellsStack.current[cellsStack.current.length - 1];
    const adjacentCells = getAdjacentCells(prevRowInd, prevCellInd);
    return adjacentCells.some(
      ([adjacentRowInd, adjacentCellInd]) =>
        adjacentRowInd === rowInd && adjacentCellInd === cellInd
    );
  }
  ("");
  function getAdjacentCells(rowInd: number, cellInd: number) {
    const adjacentCells = [];
    if (rowInd > 0) adjacentCells.push([rowInd - 1, cellInd]);
    if (rowInd < board.length - 1) adjacentCells.push([rowInd + 1, cellInd]);
    if (cellInd > 0) adjacentCells.push([rowInd, cellInd - 1]);
    if (cellInd < board[0].length - 1)
      adjacentCells.push([rowInd, cellInd + 1]);
    return adjacentCells;
  }

  return (
    <div className="w-[95vmin] h-[95vmin] md:w-[70vmin] md:h-[70vmin]">
      {board.map((eachRow, rowInd) => {
        return (
          <div key={rowInd} style={{ height: `${100 / 6}%` }}>
            {eachRow.map((eachCell, cellInd) => {
              return (
                <div
                  key={cellInd}
                  style={{ width: `${100 / 6}%` }}
                  className="h-full inline-block bg-blue border-background border-2"
                >
                  <div
                    className="flex justify-center items-center w-full h-full"
                    onMouseDown={(e) =>
                      handleMouseDown(rowInd, cellInd, e, eachCell)
                    }
                    onMouseEnter={(e) =>
                      handleMouseEnter(rowInd, cellInd, eachCell)
                    }
                    onMouseUp={(e) => handleMouseUp(rowInd, cellInd, e)}
                    style={{
                      background:
                        eachCell.cellType === "Path" && eachCell.cellColor,
                    }}
                  >
                    <span
                      className="w-[90%] h-[90%] rounded-full"
                      style={{
                        background:
                          eachCell.cellType === "Terminal" &&
                          eachCell.cellColor,
                      }}
                    />
                  </div>
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
