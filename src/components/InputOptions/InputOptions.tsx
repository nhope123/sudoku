import { Box, Button, SxProps, Theme } from '@mui/material';
import React, { useCallback, useContext, useMemo } from 'react';
import { SudokuContext } from '../../context/SudokuContext';

const containerSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-around",
  maxWidth: "900px",
  width: "95vw",
  mt: "20px",
};

const InputOptions = () => {

  const { selectedCell, setInputValue} = useContext(SudokuContext);

  const options = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

  const _handleClick = useCallback((value: number) => {
    setInputValue?.(value, selectedCell);
  }, [selectedCell]);

  return (
    <Box sx={containerSx}>
      {options.map((option, i) => (
        <Button key={i} onClick={() => _handleClick(option)} sx={{
          color: "white",
          border: "1px solid white",
        }}>{option}</Button>
      ))}
    </Box>
  );
};

export default InputOptions;