import { createContext, FC, PropsWithChildren, useState } from "react";
import SudokuBuilder from "../helpers/SudokuBulider/SudokuBuilder";

interface SudokuContextState {
  getBox?: (row: number, column: number) => number[][];
  selectedCell: { row: number; column: number } | null;
  setSelectedCell?: (row: number, column: number) => void;
  getCellPosition?: (
    row: number,
    column: number
  ) => { row: number; column: number };
}

const SudokuContext = createContext<SudokuContextState>({
  selectedCell: null,
});

// Create the provider component
const SudokuProvider: FC<PropsWithChildren> = ({ children }) => {
  const gameBoard = new SudokuBuilder();
  // const [sudoku, setSudoku] = useState<number[][]>(gameBoard.getBoard());
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    column: number;
  } | null>(null);

  const _handleSelectedCell = (row: number, column: number) => {
    gameBoard.setSelectedCell(row, column);

    setSelectedCell(gameBoard.getCellPosition(row, column));
  };

  console.log("Selected Cell: ", selectedCell);
  

  const state = {
    getBox: gameBoard.getBox,
    selectedCell: selectedCell,
    setSelectedCell: _handleSelectedCell,
    getCellPosition: gameBoard.getCellPosition,
  };

  // Provide the state and functions to the children components
  return (
    <SudokuContext.Provider value={state}>{children}</SudokuContext.Provider>
  );
};

export { SudokuContext, SudokuProvider };
