import { Util } from "./util";

const COLUMN_COUNT = 6;
const ROW_COUNT = 6;

export function getOptimalMove(board: number[][]) {
  const [col] = minimax(board, 5, -Infinity, Infinity, true);
  return col;
}

function minimax(
  board: number[][],
  depth: number,
  aplha: number,
  beta: number,
  isMaximizing: boolean
): [number, number] {
  const validLocations = getValidLocations(board);
  const isTerminal = isTerminalNode(board);
  if (depth == 0 || isTerminal) {
    if (isTerminal) {
      if (Util.checkWin(board, 2)) {
        return [null, 100000000000000];
      } else if (Util.checkWin(board, 1)) {
        return [null, -10000000000000];
      } else {
        return [null, 0];
      }
    } else {
      return [null, scorePosition(board, 2)];
    }
  }
  if (isMaximizing) {
    let value = -Infinity;
    let column =
      validLocations[Math.floor(Math.random() * validLocations.length)];
    for (let col of validLocations) {
      let row = getValidRow(board, col);
      let bCopy = [...board.map((row) => [...row])];
      bCopy[row][col] = 2;
      let newScore = minimax(bCopy, depth - 1, aplha, beta, false)[1];
      if (newScore > value) {
        value = newScore;
        column = col;
      }
      aplha = Math.max(aplha, value);
      if (beta <= aplha) {
        break;
      }
    }
    return [column, value];
  } else {
    let value = Infinity;
    let column =
      validLocations[Math.floor(Math.random() * validLocations.length)];
    for (let col of validLocations) {
      let row = getValidRow(board, col);
      let bCopy = [...board.map((row) => [...row])];
      bCopy[row][col] = 1;
      let newScore = minimax(bCopy, depth - 1, aplha, beta, true)[1];
      if (newScore < value) {
        value = newScore;
        column = col;
      }
      beta = Math.min(beta, value);
      if (beta <= aplha) {
        break;
      }
    }
    return [column, value];
  }
}

function getValidLocations(board: number[][]) {
  const validLocations: number[] = [];
  for (let col = 0; col < COLUMN_COUNT; col++) {
    if (board[0][col] == 0) {
      validLocations.push(col);
    }
  }
  return validLocations;
}

function isTerminalNode(board: number[][]) {
  return (
    Util.checkWin(board, 1) ||
    Util.checkWin(board, 2) ||
    getValidLocations(board).length == 0
  );
}

function scorePosition(board: number[][], player: number) {
  let score = 0;
  let centerArray = [
    board[0][3],
    board[1][3],
    board[2][3],
    board[3][3],
    board[4][3],
    board[5][3],
  ];
  let centerCount = centerArray.filter((val) => val == player).length;
  score += centerCount * 3;
  // horizontal score
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COLUMN_COUNT - 3; col++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row][col + i]);
      }
      score += evaluateWindow(window, player);
    }
  }
  // vertical score
  for (let col = 0; col < COLUMN_COUNT; col++) {
    for (let row = 0; row < ROW_COUNT - 3; row++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row + i][col]);
      }
      score += evaluateWindow(window, player);
    }
  }
  // diagonal score
  for (let row = 0; row < ROW_COUNT - 3; row++) {
    for (let col = 0; col < COLUMN_COUNT - 3; col++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row + i][col + i]);
      }
      score += evaluateWindow(window, player);
    }
  }
  // diagonal score
  for (let row = 0; row < ROW_COUNT - 3; row++) {
    for (let col = 3; col < COLUMN_COUNT; col++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(board[row + i][col - i]);
      }
      score += evaluateWindow(window, player);
    }
  }

  return score;
}

function evaluateWindow(window: number[], player: number) {
  let score = 0;
  let opponent = player == 1 ? 2 : 1;
  let count = window.filter((val) => val == player).length;
  if (count == 4) {
    score += 100;
  } else if (count == 3 && window.filter((val) => val == 0).length == 1) {
    score += 5;
  } else if (count == 2 && window.filter((val) => val == 0).length == 2) {
    score += 2;
  }
  count = window.filter((val) => val == opponent).length;
  if (count == 3 && window.filter((val) => val == 0).length == 1) {
    score -= 4;
  }
  return score;
}

function getValidRow(board: number[][], col: number) {
  for (let row = ROW_COUNT - 1; row >= 0; row--) {
    if (board[row][col] == 0) {
      return row;
    }
  }
}
