import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Footer from "./pages/Footer";
// import ZakatForm from "./components/ZakatForm";
import SedekahForm from "./components/SedekahForm";
// import Amil from "./components/Amil";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HiraLogo from "./assets/hira-logo.png";
import ResultPaymentZakat from "./components/ZakatForm/result-payment-zakat";
// import ResultPaymentSedekah from "./components/SedekahForm/result-payment-sedekah";

function Default() {
  const [agenId, setAgenId] = useState<string>("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCari = () => {
    console.log("agenId", agenId);
    fetch(`/api/form/amil/${agenId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.metadata && data.metadata.status === "ERROR") {
          setMessage("Agen ID does not exist");
        } else {
          navigate(`/agen/${agenId}`);
        }
      })
      .catch((e) => {
        console.error(e);
        setMessage("An error occurred while fetching data");
      });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <img
        src={HiraLogo}
        alt="Logo Hira"
        style={{ padding: "20px", marginBottom: "50px" }}
      />
      <Paper sx={{ padding: "5px 10px 10px 10px" }}>
        <TextField
          label="Masukkan Agen ID"
          type="search"
          variant="standard"
          sx={{ marginRight: "10px" }}
          onChange={(e) => setAgenId(e.target.value)}
        />
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "10px" }}
          onClick={handleCari}
        >
          Cari
        </Button>
        {message && (
          <Typography
            color="error"
            marginTop="10px"
            sx={{
              animation: "blink 1s linear infinite",
              "@keyframes blink": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0.4 },
                "100%": { opacity: 1 },
              },
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
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
                <Route path="/agen/:id" element={<SedekahForm />} />
                {/* <Route path="/form/zakat/amil/:id" element={<ZakatForm />} /> */}
                <Route
                  path="/payment/receipt/:ref_no"
                  element={<ResultPaymentZakat />}
                />
                {/* farah */}
                {/* <Route
                  path="/form/sedekah/amil/:id"
                  element={<SedekahForm />}
                /> */}
                {/* <Route
                  path="/payment/receipt/:ref_no"
                  element={<ResultPaymentSedekah />}
                /> */}
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
