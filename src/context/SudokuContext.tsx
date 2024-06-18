import { createContext, FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import SudokuBuilder from "../helpers/SudokuBulider/SudokuBuilder";

interface SudokuContextState {
  hiddenCells: number[];
  inputValue?: number;
  selectedCell?: number;
  setInputValue?: (value?: number) => void;
  setSelectedCell?: (cell?: number) => void;
  setHiddenCells?: (hiddenCells: number[]) => void;
  sudokuBoard: number[];
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

// Create the provider component
const SudokuProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getBoard } = useMemo(() => new SudokuBuilder(), []);

  const [selectedCell, setSelectedCell] = useState<number| undefined>();

  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>(() => Array.from(generateRandomSet(25, 81)));
  const [inputValue, setInputValue] = useState<number | undefined>();
  
  const _handleSelectedCell = useCallback((selection?: number) => {
    setSelectedCell(selection);
  }, []);

  // console.log("Selected Cell: ", selectedCell);

  const _setInputValue = useCallback((value?: number) => { setInputValue(value)}, []);
  
  console.log('inputValue: ', inputValue);

  const state = useMemo(() => ({
    inputValue: inputValue,
    setInputValue: _setInputValue,
    hiddenCells: hiddenIndexes,
    setHiddenCells: setHiddenIndexes,
    sudokuBoard: getBoard(),
    selectedCell: selectedCell,
    setSelectedCell: _handleSelectedCell,
  }), [selectedCell, _handleSelectedCell, getBoard()]);

  // Provide the state and functions to the children components
  return (
    <SudokuContext.Provider value={state}>{children}</SudokuContext.Provider>
  );
};

export { SudokuContext, SudokuProvider };

