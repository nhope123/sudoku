const conversionTable = {
  0: [0, 1, 2],
  1: [3, 4, 5],
  2: [6, 7, 8],
};

class SudokuBuilder {
  sudoku: number[][] = [];
  private selectedCell: { row: number; column: number } | null = null;
  constructor() {
    // this.initializeBoard();
    // this.validateBoard();
    this.initializeSudokuBoard();
  }

  initializeSudokuBoard = () => {
    const board = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => 0)
    );
    this.fillDiagonalBoxes(board);
    this.fillRemainingCells(board, 0, 3);
    this.sudoku = board;
  };

  fillDiagonalBoxes = (board: number[][]) => {
    for (let i = 0; i < 9; i += 3) {
      this.fillBox(board, i, i);
    }
  };

  fillBox = (board: number[][], row: number, col: number) => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.shuffleArray(nums);
    let numIndex = 0;
    for (let i = row; i < row + 3; i++) {
      for (let j = col; j < col + 3; j++) {
        board[i][j] = nums[numIndex];
        numIndex++;
      }
    }
  };

  fillRemainingCells = (board: number[][], row: number, col: number) => {
    if (col >= 9 && row < 9 - 1) {
      row = row + 1;
      col = 0;
    }
    if (row >= 9 && col >= 9) {
      return true;
    }
    if (row < 3) {
      if (col < 3) {
        col = 3;
      }
    } else if (row < 6) {
      if (col === Math.floor(row / 3) * 3) {
        col = col + 3;
      }
    } else {
      if (col === 6) {
        row = row + 1;
        col = 0;
        if (row >= 9) {
          return true;
        }
      }
    }
    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (this.fillRemainingCells(board, row, col + 1)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  };

  isSafe = (board: number[][], row: number, col: number, num: number) => {
    return (
      !this.usedInRow(board, row, num) &&
      !this.usedInCol(board, col, num) &&
      !this.usedInBox(board, row - (row % 3), col - (col % 3), num)
    );
  };

  usedInRow = (board: number[][], row: number, num: number) => {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  };

  usedInCol = (board: number[][], col: number, num: number) => {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  };

  usedInBox = (
    board: number[][],
    boxStartRow: number,
    boxStartCol: number,
    num: number
  ) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row + boxStartRow][col + boxStartCol] === num) {
          return true;
        }
      }
    }
    return false;
  };

  shuffleArray = (array: unknown[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  getSelectedCell = () => {
    return this.selectedCell;
  };

  setSelectedCell = (row?: number, column?: number) => {
    console.log("row: ", row, "column: ", column);

    if (row === undefined || column === undefined) {
      this.selectedCell = null;
      return;
    }
    this.selectedCell = { row, column };
  };

  setValue = (row: number, column: number, value: number) => {
    this.sudoku[row][column] = value;
  };

  /* 
  The getBoard method returns the sudoku board.
  @returns {number[][]} - The sudoku board. 
  */
  getBoard = () => {
    return this.sudoku;
  };

  /* 
  The getRow method takes a row number as an argument and returns the corresponding row from the sudoku board.
  @param {number} row - The row number.
  @returns {number[]} - The row from the sudoku board.
  */
  getRow = (row: number) => {
    return this.sudoku[row];
  };

  /*
  The getColumn method takes a column number as an argument and returns the corresponding column from the sudoku board.
  @param {number}
  @returns {number[]} - The column from the sudoku board.

  */
  getColumn = (column: number) => {
    const result = [];
    for (let i = 0; i < this.sudoku.length; i++) {
      result.push(this.sudoku[i][column]);
    }
    return result;
  };

  /* 
  The getBox method takes two arguments: row and column.
  It returns a 3x3 box from the sudoku board based on the row and column provided.
  @param {number} row - The row of the box.
  @param {number} column - The column of the box.
  @returns {number[][]} - The 3x3 box from the sudoku board.
  */
  getBox = (row: number, column: number) => {
    const result: number[][] = [];

    for (let i = 0; i < 3; i++) {
      const rowIndex = conversionTable[row as keyof typeof conversionTable][i];
      const boxRow = [];
      for (let j = 0; j < 3; j++) {
        const columnIndex =
          conversionTable[column as keyof typeof conversionTable][j];
        boxRow.push(this.sudoku[rowIndex][columnIndex]);
      }
      result.push(boxRow);
    }

    return result;
  };

  getCellPosition = (row: number, column: number) => {
    const columnIndex =
      conversionTable[row as keyof typeof conversionTable][column];
    return { row: row, column: columnIndex };
  };

  isRowValid = (row: number, value: number) => {
    return !this.getRow(row).includes(value);
  };

  isColumnValid = (column: number, value: number) => {
    return !this.getColumn(column).includes(value);
  };

  isBoxValid = (row: number, column: number, value: number) => {
    return !this.getBox(row, column).flat().includes(value);
  };

  isValidBoard = (board: number[][], row: number, column: number) => {
    return (
      this.isRowValid(row, board[row][column]) &&
      this.isColumnValid(column, board[row][column]) &&
      this.isBoxValid(row, column, board[row][column])
    );
  };
}

export default SudokuBuilder;
