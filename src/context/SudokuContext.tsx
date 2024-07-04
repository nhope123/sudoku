import { createContext, FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import SudokuBuilder from "../helpers/SudokuBulider/SudokuBuilder";

interface SudokuContextState {
  hiddenCells: number[];
  inputValue?: number;
  selectedCell?: number;
  getCellValue?: (position: number) => number | undefined;
  setInputValue?: (value?: number, select?: number) => void;
  setSelectedCell?: (cell?: number) => void;
  setHiddenCells?: (hiddenCells: number[]) => void;
  sudokuBoard: number[];
  getCellError?: (position: number) => number | undefined;
}

const generateRandomSet = (size: number, limit: number) => {
  const randomSet = new Set<number>();
  let setSize = size;
  let setLimit = limit;

  if (setSize > limit) setSize = limit;
  if (setLimit < setSize) setLimit = setSize;

  while (randomSet.size < setSize) {
    const randomInt = Math.floor(Math.random() * setLimit);
    randomSet.add(randomInt);
  }
  return randomSet;
}

const SudokuContext = createContext<SudokuContextState>({
  hiddenCells: [],
  selectedCell: undefined,
  sudokuBoard: [],
});

SudokuContext.displayName = "SudokuContext";

// Create the provider component
const SudokuProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getBoard } = useMemo(() => new SudokuBuilder(), []);
  const hidden = Array.from(generateRandomSet(25, 81)).sort((a, b) => a - b);

  const [sudokuBoard, setSudokuBoard] = useState<number[]>(() => getBoard());

  const [selectedCell, setSelectedCell] = useState<number| undefined>(undefined);
  const [cellErrors, setCellErrors] = useState<{[key: number]: number | undefined }>({});
  

  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>(hidden);
  const [inputValue, setInputValue] = useState<number | undefined>();
  
  const _handleSelectedCell = useCallback((selection?: number) => {
    setSelectedCell(selection);
  }, []);



  const _setInputValue = useCallback((value?: number, select?: number) => { 

    setHiddenIndexes((i) => i.filter((index) => index !== select));

    if (select && sudokuBoard[select] === value && cellErrors[select]) {
      setCellErrors((errors) => ({ ...errors, [select as number]: undefined }));
    }
    else {
      setCellErrors((errors) => ({ ...errors, [select as number]: value }));
    }

    setInputValue(value);
  }, [sudokuBoard]);

  const _getCellValue = useCallback((position: number) => {
    if (hiddenIndexes.indexOf(position) >= 0) return undefined;

    return sudokuBoard[position];
  }, [sudokuBoard, hiddenIndexes]);
  
 const _getCellError = useCallback((position: number) => {
    return cellErrors[position];
 }, [cellErrors]);

  const state = { 
    getCellValue: _getCellValue,
    inputValue: inputValue,
    setInputValue: _setInputValue,
    hiddenCells: hiddenIndexes,
    setHiddenCells: setHiddenIndexes,
    sudokuBoard,
    selectedCell: selectedCell,
    setSelectedCell: _handleSelectedCell,
    getCellError: _getCellError,
  };

  // Provide the state and functions to the children components
  return (
    <SudokuContext.Provider value={state}>{children}</SudokuContext.Provider>
  );
};

export { SudokuContext, SudokuProvider };

