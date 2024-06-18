import { Box, SxProps, Theme, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { SudokuContext } from "../../context/SudokuContext";
import SudokuCell from "../SudokuCell/SudokuCell";
import InputOptions from "../InputOptions/InputOptions";

const containerSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  maxWidth: '900px',
  width: "95vw",
  maxHeight: '900px',
  height: "95vw",
};

const SudokuBoard: FC = () => {
  const { selectedCell, sudokuBoard } = useContext(SudokuContext);

  

  return (
    <>
      <h1> Sudoku Board </h1>
      <Typography variant="body1" gutterBottom>
        {selectedCell ?? "No cell selected"}
      </Typography>
      <Box sx={containerSx}>
        {sudokuBoard.map((cell, i) => (
          <SudokuCell key={i} value={cell} position={i} />
        ))
        }
      </Box>
      <InputOptions />
    </>
  );
};

export default SudokuBoard;
