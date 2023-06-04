import { ConnectFourState } from "../../store/connect-four";

export class Util {
  static CreateBoard(gameDim) {
    let board = [];
    let currentRow = [];
    for (let i = 0; i < gameDim; i++) {
      currentRow = [];
      for (let j = 0; j < gameDim; j++) currentRow.push(0);
      board.push(currentRow);
    }
    return board;
  }
  static createCopy(board) {
    return board.map((each) => each.slice());
  }
  static getColor(num) {
    if (num === 1) return "black";
    if (num === 2) return "yellow";
    return "";
  }
  static checkWin(mat, player) {
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat.length; j++) {
        if (this.goLeft(mat, player, i, j)) return true;
        if (this.goRight(mat, player, i, j)) return true;
        if (this.goUp(mat, player, i, j)) return true;
        if (this.goDown(mat, player, i, j)) return true;
        if (this.goDiagonalLeft(mat, player, i, j)) return true;
        if (this.goDiagonalRight(mat, player, i, j)) return true;
      }
    }
    return false;
  }
  static checkDraw(mat) {
    return mat.every((each) => each.every((el) => el !== 0));
  }
  static goLeft(mat, player, row, col) {
    if (col - 3 >= 0) {
      let j = 1;
      while (j <= 4) {
        if (mat[row][col] !== player) return false;
        col--;
        j++;
      }
      return true;
    }
    return false;
  }
  static goRight(mat, player, row, col) {
    if (col + 3 < mat.length) {
      let j = 1;
      while (j <= 4) {
        if (mat[row][col] !== player) return false;
        col++;
        j++;
      }
      return true;
    }

    return false;
  }
  static goDown(mat, player, row, col) {
    if (row + 3 < mat.length) {
      let j = 1;
      while (j <= 4) {
        if (mat[row][col] !== player) return false;
        row++;
        j++;
      }
      return true;
    }
  }
  static goUp(mat, player, row, col) {
    if (row - 3 >= 0) {
      let j = 1;
      while (j <= 4) {
        if (mat[row][col] !== player) return false;
        row--;
        j++;
      }
      return true;
    }
    return false;
  }
  static goDiagonalLeft(mat, player, row, col) {
    const el1 = mat[row] && mat[row][col];
    const el2 = mat[row - 1] && mat[row - 1][col - 1];
    const el3 = mat[row - 2] && mat[row - 2][col - 2];
    const el4 = mat[row + 1] && mat[row + 1][col + 1];
    return [el1, el2, el3, el4].every((each) => each === player);
  }
  static goDiagonalRight(mat, player, row, col) {
    const el1 = mat[row] && mat[row][col];
    const el2 = mat[row - 1] && mat[row - 1][col + 1];
    const el3 = mat[row - 2] && mat[row - 2][col + 2];
    const el4 = mat[row + 1] && mat[row + 1][col - 1];
    return [el1, el2, el3, el4].every((each) => each === player);
  }
  static saveBoardToDisk(
    board: number[][],
    player: 1 | 2,
    cellInd: number
  ): "valid" | "invalid" {
    board = this.createCopy(board);
    let i = board.length - 1;
    while (i >= 0 && board[i][cellInd] !== 0) i--;
    if (i < 0) return "invalid";
    board[i][cellInd] = player;
    localStorage.setItem("connectFourBoard", JSON.stringify(board));
    return "valid";
  }
  static readBoardFromDisk(gameDim: number) {
    const board = localStorage.getItem("connectFourBoard");
    return board ? JSON.parse(board) : this.CreateBoard(gameDim);
  }
}
