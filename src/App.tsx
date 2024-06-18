import { Box, SxProps, Theme } from "@mui/material";
import "./App.css";
import SudokuBoard from "./components/SudokuBoard/SudokuBoard";

const containerSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
}

function App() {

  return (
    <Box sx={containerSx}>
      <SudokuBoard />
    </Box>
  );
}

export default App;
