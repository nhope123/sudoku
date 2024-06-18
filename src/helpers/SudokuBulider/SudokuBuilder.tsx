
const rowCellIndexes = Array.from({ length: 9 }, (_, i) => {
    return Array.from({ length: 9 }, (_, j) => 9*i + j);
});

const columnCellIndexes = Array.from({ length: 9 }, (_, i) => {
  return Array.from({ length: 9 }, (_, j) => i + 9*j);
});

const boxCellIndexes = Array.from({ length: 3 }, (_, i) => {
  const groupedRows: number[][] = [];
  const boxes = [];
  Array.from({ length: 3 }, (_, j) => {
     groupedRows.push(rowCellIndexes[3* i + j])
  })
  
  const firstBox: number[][] = [];
  const secondBox: number[][] = [];
  const thirdBox: number[][] = [];
  groupedRows.forEach((row) => {
     firstBox.push(row.slice(0, 3));
     secondBox.push(row.slice(3, 6));
     thirdBox.push(row.slice(6, 9)); 
  });
  boxes.push(firstBox.flat(), secondBox.flat(), thirdBox.flat());

  return boxes;
});

class SudokuBuilder {
  sudoku: number[] = [];

  constructor() {
    this.sudoku = Array.from({ length: 81 }, () => 0);
    this.solveSudoku(this.sudoku);
  }

  // Backtracking algorithm to solve the Sudoku puzzle
  solveSudoku(board: number[]): boolean {
    for (let i = 0; i < 81; i++) {
      if (board[i] === 0) {
        const randomSet = Array.from(this.generateRandomSet());
        for (let num = 0; num < 9; num++) {
          if (this.isSafe(board, i, randomSet[num])) {
            board[i] = randomSet[num];
            if (this.solveSudoku(board)) {
              return true;
            }
            board[i] = 0;
          }
        }
        return false;
      }
    }
    return true;
  }

  isSafe = (board: number[], index: number, value: number) => {
    const { rowIndices, columnIndices, boxIndices } = this.getIndices(index);

    return !this._usedInBlock(board, boxIndices, value)
      && !this._usedInBlock(board, rowIndices, value)
      && !this._usedInBlock(board, columnIndices, value);
  }

  _usedInBlock = (board: number[], block: number[], num: number) => {
    return block.some(i => board[i] === num);
  }

  generateRandomSet = () => {
    const randomSet = new Set<number>();
    while (randomSet.size < 9) {
      const randomInt = Math.floor(Math.random() * 9 + 1);
      randomSet.add(randomInt);
    }
    return randomSet;
  }

  getIndices = (index: number) => {
    const rowIndices = rowCellIndexes[Math.floor(index / 9)];
    const columnIndices = columnCellIndexes[index % 9];
    const boxIndices = boxCellIndexes[Math.floor(index / 27)][Math.floor((index % 9) / 3)];

    return { rowIndices, columnIndices, boxIndices };
  }

  getBoard = () => {
    return this.sudoku;
  }
}

export default SudokuBuilder;
