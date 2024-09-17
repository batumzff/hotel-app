import AppRouter from "./routes/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from "./components/NAVBAR/Navbar";
import Footer from "./components/FOOTER/Footer";
import Box from "@mui/material/Box";

const stripePromise = loadStripe(import.meta.env.VITE_SECRET_PAYMENT_KEY);

function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
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
      </Elements>
    </Router>
  );
}

export default App;