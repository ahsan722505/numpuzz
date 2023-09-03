import { Cell, CellColor } from "./Board";

export class Util {
  static createBoard(boardSize: number): Cell[][] {
    let board: Cell[][] = [];
    for (let i = 0; i < boardSize; i++) {
      let row: Cell[] = [];
      board.push(row);
      for (let j = 0; j < boardSize; j++) {
        board[i].push({ cellColor: CellColor.empty, cellType: "Path" });
      }
    }
    board[0][0] = { cellColor: CellColor.red, cellType: "Terminal" };
    board[0][2] = { cellColor: CellColor.green, cellType: "Terminal" };
    board[1][0] = { cellColor: CellColor.purple, cellType: "Terminal" };
    board[2][4] = { cellColor: CellColor.red, cellType: "Terminal" };
    board[2][5] = { cellColor: CellColor.green, cellType: "Terminal" };
    board[3][3] = { cellColor: CellColor.purple, cellType: "Terminal" };
    board[3][4] = { cellColor: CellColor.white, cellType: "Terminal" };
    board[3][5] = { cellColor: CellColor.yellow, cellType: "Terminal" };
    board[4][1] = { cellColor: CellColor.yellow, cellType: "Terminal" };
    board[5][0] = { cellColor: CellColor.white, cellType: "Terminal" };
    return board;
  }

  static createCopy(board: Cell[][]) {
    return board.map((each) => each.slice());
  }
}
