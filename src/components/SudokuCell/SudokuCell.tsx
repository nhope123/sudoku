// import React, { useContext } from "react";
// import { SudokuContext } from "../../context/SudokuContext";

interface SudokuCellProps {
  value: number;
  // position: { row: number; column: number };
}

const SudokuCell: React.FC<SudokuCellProps> = ({ value }) => {
  // const { selectedCell, setSelectedCell } = useContext(SudokuContext);

  const _handleClick = () => {
    // setSelectedCell?.(position.row, position.column);
    console.log("selected");
  };

  return <button onClick={_handleClick}>{value}</button>;
};

export default SudokuCell;
