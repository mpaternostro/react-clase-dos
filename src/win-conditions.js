export const checkVerticalWin = (tiles, player) => {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      if (
        tiles[columnIndex] === player &&
        tiles[columnIndex + 3] === player &&
        tiles[columnIndex + 6] === player
      ) {
        return true;
      }
    }
  }

export const checkHorizontalWin = (tiles, player) => {
    for (let rowIndex = 0; rowIndex < 7; rowIndex += 3) {
      if (
        tiles[rowIndex] === player &&
        tiles[rowIndex + 1] === player &&
        tiles[rowIndex + 2] === player
      ) {
        return true;
      }
    }
  }

export const checkDiagonalWin = (tiles, player) => {
    if (tiles[4] === player) {
      if (
        tiles[0] === player &&
        tiles[8] === player
      ) {
        return true;
      }
      if (
        tiles[2] === player &&
        tiles[6] === player
      ) {
        return true;
      }
    }
  }
