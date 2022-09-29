export class Util {
  static CreateBoard(gameDim) {
    let board = [];
    let currentRow = [];
    for (let i = 0; i < gameDim; i++) {
      currentRow = [];
      for (let j = 0; j < gameDim; j++) currentRow.push(1);
      board.push(currentRow);
    }
    return board;
  }
}
