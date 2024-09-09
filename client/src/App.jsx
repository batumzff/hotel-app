import AppRouter from "./routes/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/FOOTER/Footer";
import { Box } from "@mui/material";
// import "./App.css";

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            flexGrow: 1, 
          }}
        >
          <Navbar />
          <AppRouter />
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
