import { BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";
import backgroundImg from "./assets/images/backgroundImg-2.jpg";


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
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", 
            backgroundAttachment:"fixed",
            
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