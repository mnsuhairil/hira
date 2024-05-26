import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import axios from "axios";
import { useState } from "react";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// const hook = axios.create({
//   baseURL: baseURL,
//   // withCredentials: true,
//   headers: {
//     "X-Requested-With": "XMLHTTPRequest",
//   },
// });

// const csrf = () => hook.get(baseURL + "/sanctum/csrf-cookie");

function Login() {
  const [email, setEmail] = useState("suhairul@test.com");
  const [password, setPassword] = useState("abcd1234");
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  // const [csrfToken, setCsrfToken] = useState("");

  // async function handleLogin2() {
  //   await csrf();

  //   hook
  //     .post("/login", {
  //       email,
  //       password,
  //     })
  //     .then((response) => console.log("response", response));
  // }

  // // Step 1: Login and set cookies
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("/login", {
  //       email,
  //       password,
  //     });

  //     // Extract the CSRF token from the response headers
  //     const csrfToken = response.headers["set-cookie"]?.find((cookie) =>
  //       cookie.startsWith("XSRF-TOKEN=")
  //     );

  //     if (csrfToken) {
  //       document.cookie = csrfToken;
  //       setCsrfToken(csrfToken);
  //     }

  //     // Assuming that the cookies are set in the response
  //     const sessionCookie = response.headers["laravel_session"];
  //     if (sessionCookie) {
  //       document.cookie = `laravel_session=${sessionCookie}`;
  //     }

  //     setLoggedIn(true);
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };

  // // Step 2: Get CSRF token
  // const getCsrfCookie = async () => {
  //   try {
  //     // Make a GET request to the CSRF token URL
  //     await axios.get("/sanctum/csrf-cookie");
  //   } catch (error) {
  //     console.error("Failed to get CSRF token", error);
  //   }
  // };

  // // Step 3: Get user details
  // const getUserDetails = async () => {
  //   try {
  //     const response = await axios.get("/api/user");
  //     setUser(response.data);
  //   } catch (error) {
  //     console.error("Failed to get user details", error);
  //   }
  // };

  // useEffect(() => {
  //   // Perform login and set cookies
  //   handleLogin();
  // }, []);

  // useEffect(() => {
  //   // Get CSRF token
  //   getCsrfCookie();
  // }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     // Once logged in and CSRF token is set, get user details
  //     getUserDetails();
  //   }
  // }, [loggedIn]);

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton?.addEventListener("click", () => {
    container?.classList.add("right-panel-active");
  });

  signInButton?.addEventListener("click", () => {
    container?.classList.remove("right-panel-active");
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="rootContainer">
      <Container className="groupContainer">
        <Paper className="containerBox">
          <Container
            sx={{
              backgroundSize: "cover",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              height: "100vh",
              borderRadius: "20px",
            }}
          >
            <Grid
              container
              direction={"row"}
              bgcolor={"white"}
              borderRadius={"20px"}
              boxShadow="0px 0px 10px 0px rgba(0,0,0,0.2)"
            >
              <Grid item xs={12} sm={6} md={6}>
                <Container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",

                    width: "100%",
                    height: "90vh",
                    // borderTopLeftRadius: "20px",
                    // borderBottomLeftRadius: "20px",
                    borderRadius: "20px",
                  }}
                >
                  <Grid container direction={"column"} gap={10}>
                    <Grid item xs={12}>
                      <Grid container direction={"row"}>
                        <Grid item xs={6}>
                          <img
                            src="/public/assets/tulus-logo.png"
                            alt="Image 2"
                            style={{ width: "80%" }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            bgcolor={"#004C5B"}
                            borderRadius={5}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <img
                              src="/public/assets/hira-logo.png"
                              alt="Image 1"
                              style={{
                                width: "80%",
                                padding: "10px",
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={"column"}>
                        <form onSubmit={handleSubmit}>
                          <Grid item xs={12}>
                            <Typography variant="h4" className="TP">
                              Login
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              type="input"
                              label="Email"
                              variant="outlined"
                              margin="normal"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Password"
                              variant="outlined"
                              margin="normal"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              sx={{
                                borderRadius: "20px",
                                width: "30%",
                                padding: "1.5%",
                                margin: "2%",
                              }}
                            >
                              Login
                            </Button>
                          </Grid>
                        </form>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
              <Grid item xs={0} sm={6} md={6}>
                <Container
                  sx={{
                    backgroundImage: `url('/public/assets/budak_ikrar.jpg')`,
                    backgroundSize: "cover",
                    borderRadius: "20px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Grid container direction="row">
                    <Grid item xs={6}></Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
