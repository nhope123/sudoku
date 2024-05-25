import { Box, SxProps, Theme, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { SudokuContext } from "../../context/SudokuContext";
import SudokuBox from "../SudokuBox/SudokuBox";

const containerSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  rowGap: 2,
};

const rowSx: SxProps<Theme> = {
  display: "flex",
  columnGap: 2,
};

const SudokuBoard: FC = () => {
  const { selectedCell } = useContext(SudokuContext);

  const selection = useMemo(
    () =>
      {
        console.log('selectedRow: ', selectedCell?.row, 'selectedColumn: ', selectedCell?.column, 'selectedCell: ', selectedCell);
        
        return selectedCell?.row || selectedCell?.column
        ? `Selected Cell: ${selectedCell.row}, ${selectedCell.column}`
        : "No cell selected"
      },
    [selectedCell?.row, selectedCell?.column]
  );

  // console.log("Selected Cell => board: ", selectedCell);
  
  // console.log("Selection: ", selection);

  return (
    <>
      <h1> Sudoku Board </h1>
      <Typography variant="body1" gutterBottom>
        {selection}
      </Typography>
      <Box sx={containerSx}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Box key={`row-${i}`} sx={rowSx}>
            {Array.from({ length: 3 }).map((_, j) => (
              <SudokuBox key={`box-${i + j}`} value={{ row: i, column: j }} />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SudokuBoard;
