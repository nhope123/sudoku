import Button from "@mui/material/Button";
import React, { useCallback, useContext, useMemo } from "react";
import { SudokuContext } from "../../context/SudokuContext";

interface SudokuCellProps {
  position: number;
}

const SudokuCell: React.FC<SudokuCellProps> = ({ position }) => {
  const { getCellValue, getCellError, inputValue, selectedCell, setSelectedCell } = useContext(SudokuContext);

  const _handleClick = useCallback(() => {
    setSelectedCell?.(position);

  }, [position, setSelectedCell]);

 

const {cellError, cellValue} = useMemo(() => {

  return {cellError: getCellError?.(position), cellValue: getCellValue?.(position) ?? ''};
  
 
}, [position, selectedCell, inputValue ]);



  return (
    <Button 
      color="primary" 
      disabled={cellValue !== '' && !cellError} 
      onClick={_handleClick} 
      sx={{
        border: `1px ${selectedCell === position ? 'inset' :  'solid'} ${cellError ? 'red' : 'white'}`, 
        color: `${cellError ? 'red' : 'white'}`, // 'white', 
        backgroundColor: selectedCell === position ? 'primary.main' : 'inherit',
        '&:disabled': {
          color: "white",
        },
      }}
      >
        {cellError ?? cellValue}
      </Button>
    );
};

export default SudokuCell;
