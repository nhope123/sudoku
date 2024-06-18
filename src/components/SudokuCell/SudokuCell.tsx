import Button from "@mui/material/Button";
import React, { useCallback, useContext, useMemo } from "react";
import { SudokuContext } from "../../context/SudokuContext";

interface SudokuCellProps {
  value: number;
  position: number;
}

const SudokuCell: React.FC<SudokuCellProps> = ({ value, position }) => {
  const { selectedCell, setSelectedCell, hiddenCells, inputValue, setInputValue, setHiddenCells } = useContext(SudokuContext);

  const _handleClick = useCallback(() => {
    setSelectedCell?.(position);
  }, [position, setSelectedCell]);



const inputError = useMemo(() => {
  const isCellHidden = hiddenCells.includes(position); 
  
  if (inputValue) console.log('inputValue: ', inputValue);

  if (isCellHidden && inputValue) {
    console.log('position: ', position);
  }
  if (isCellHidden && selectedCell === position && inputValue) {
    if (value !== inputValue) {
      setSelectedCell?.(undefined);
      // setInputValue?.(undefined);
      setHiddenCells?.(hiddenCells.filter(cell => cell !== position));

    

      return inputValue;
    }
    
    return undefined;

  }
}, [ hiddenCells, inputValue, position, selectedCell, setHiddenCells, setSelectedCell, value]);  

const cellValue = useMemo(() => {
  const isCellHidden = hiddenCells.includes(position);  

  if (inputError) return inputError;

  return isCellHidden ? "" : value;
}, [hiddenCells, position, value]);

if (inputValue)
   console.log('inputValue cell: ', inputValue);

  return <Button color="primary" disabled={cellValue !== ''} onClick={_handleClick} sx={{
    border: `1px solid ${inputError ? 'red' : 'white'}`,
    color: inputError ? 'red' : 'white',
    '&:disabled': {
      color: "white",
    },
  }}>{inputError ?? cellValue}</Button>;
};

export default SudokuCell;
