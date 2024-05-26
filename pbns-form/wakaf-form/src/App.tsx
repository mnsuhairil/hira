import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./pages/Footer";

import { Box, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import WakafLogo from "./assets/pbns.png";
import WakafForm from "./components/WakafForm";

function Default() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <img
        src={WakafLogo}
        alt="Logo Hira"
        width={"50%"}
        style={{ padding: "20px", marginBottom: "50px" }}
      />
    </Box>
  );
}

function App() {
  return (
    <>
      <div className="rootContainer">
        <Container className="groupContainer">
          <Paper className="containerBox" elevation={3}>
            <Router>
              <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/wakaf/form" element={<WakafForm />} />
              </Routes>
            </Router>
          </Paper>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
