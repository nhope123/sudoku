import { Box, SxProps, Theme, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { SudokuContext } from "../../context/SudokuContext";
import InputOptions from "../InputOptions/InputOptions";
import SudokuCell from "../SudokuCell/SudokuCell";

const containerSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  maxWidth: '900px',
  width: "95vw",
  maxHeight: '900px',
  height: "95vw",
  gap: 0.5,
};

const SudokuBoard: FC = () => {
  const { selectedCell } = useContext(SudokuContext);  

  return (
    <>
      <h1> Sudoku Board </h1>
      <Typography variant="body1" gutterBottom>
        {selectedCell ?? "No cell selected"}
      </Typography>
      <Box sx={containerSx}>
        { Array.from({ length: 81 }, (_, i) => (
          <SudokuCell key={i} position={i} /> 
          ))
        }
      </Box>
      <InputOptions />
    </>
  );
};

export default SudokuBoard;
