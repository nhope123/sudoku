import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useMemo } from "react";
import { SudokuContext } from "../../context/SudokuContext";
import SudokuCell from "../SudokuCell/SudokuCell";

interface SudokuBoxProps {
  value: {
    row: number;
    column: number;
  };
}

const containerSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  rowGap: 0.25,
  // border: "1px solid black",
};

const rowSx: SxProps<Theme> = {
  display: "flex",
  columnGap: 0.25,
};

const SudokuBox: React.FC<SudokuBoxProps> = (props) => {
  const { value } = props;
  const { getBox } = useContext(SudokuContext);

  const { box } = useMemo(() => {
    return {
      box: getBox?.(value.row, value.column),
    };
  }, [getBox, value.row, value.column]);

  return (
    <Box sx={containerSx}>
      {Array.isArray(box) &&
        box.map((row, i) => (
          <Box key={i} sx={rowSx}>
            {Array.isArray(row) &&
              row.map((cell, j) => <SudokuCell key={i + j} value={cell} />)}
          </Box>
        ))}
    </Box>
  );
};

export default SudokuBox;
