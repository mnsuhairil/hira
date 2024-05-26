import {
  BusinessRounded,
  FacebookRounded,
  FaxRounded,
  Instagram,
  PhoneRounded,
  Twitter,
} from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TulusLogo from "./../assets/tulus-logo.png";
import PlayStore from "./../assets/play-store.png";
import AppStore from "./../assets/apps-store.png";

const xsStyles = {
  display: "flex",
  alignItems: { xs: "center", md: "flex-start" },
  justifyContent: { xs: "center", md: "flex-start" },
};

function Footer() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar position="static" color="transparent" className="footerAppbar">
        <Toolbar>
          <Box flexGrow={1}>
            <Grid
              container
              pb={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Left content */}
              <Grid container item xs={12} sm={5} md={5}>
                <Grid item xs={12} sx={xsStyles}>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      textAlign: "left",
                      color: "white",
                    }}
                    variant="h6"
                  >
                    Powered by
                  </Typography>
                </Grid>

                {/* Image */}
                <Grid item xs={12} paddingBottom={2} sx={xsStyles}>
                  <img
                    src={TulusLogo}
                    alt="Logo Tulus"
                    style={{
                      width: theme.breakpoints.down("sm") ? "160px" : "160px",
                      marginLeft: "-10px",
                    }}
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    color="white"
                    paddingBottom={"1%"}
                  >
                    <Grid item xs={2} md={1}>
                      <Box
                        bgcolor="white"
                        borderRadius="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="26px"
                        height="26px"
                      >
                        <PhoneRounded
                          style={{ color: "black", fontSize: "18px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="subtitle2">
                        +603 5567 0103
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Fax */}
                <Grid item xs={12}>
                  <Grid container alignItems="center" color="white">
                    <Grid item xs={2} md={1}>
                      <Box
                        bgcolor="white"
                        borderRadius="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="26px"
                        height="26px"
                      >
                        <FaxRounded
                          style={{ color: "black", fontSize: "18px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="subtitle2">
                        +603 5569 4030 (fax)
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Address */}
                <Grid item xs={12} paddingBottom={2}>
                  <Grid container alignItems="center" color="white">
                    <Grid item xs={2} md={1}>
                      <Box
                        bgcolor="white"
                        borderRadius="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="26px"
                        height="26px"
                      >
                        <BusinessRounded
                          style={{ color: "black", fontSize: "18px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="subtitle2">
                        Unit 3-12-09 UOA Bussiness Park, 1, Jalan Pengaturan
                        U1/51a, Section U1, 40150 Shah Alam, Selangor
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Social Media Icons */}
                <Grid item xs={12} ml={-0.2}>
                  <FacebookRounded
                    fontSize={isSmallScreen ? "small" : "large"}
                    style={{ color: "white", fontSize: "26px" }}
                  />
                  <Twitter
                    fontSize={isSmallScreen ? "small" : "large"}
                    style={{ color: "white", fontSize: "26px" }}
                  />
                  <Instagram
                    fontSize={isSmallScreen ? "small" : "large"}
                    style={{ color: "white", fontSize: "26px" }}
                  />
                </Grid>

                {/* Text */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    paddingBottom: "5%",
                  }}
                >
                  <Typography variant="body2" color="white">
                    Tulus Digital Sdn Bhd (930302 -A)
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3} marginBottom={"-1%"}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                    pb={1}
                  >
                    {/* Image 1 */}
                    <img
                      src={PlayStore}
                      alt="playStoreImageButton"
                      style={{ width: "60%" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* Image 2 */}
                    <img
                      src={AppStore}
                      alt="appsStoreImageButton"
                      style={{ width: "60%" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Footer;
