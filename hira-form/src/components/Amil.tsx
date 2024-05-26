// import PaymentsIcon from "@mui/icons-material/Payments";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Container, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HiraLogo from "./../assets/hira-logo.png";
import TulusLogo from "./../assets/tulus-logo.png";

const CardContainer = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(-7),
  paddingTop: theme.spacing(6),
}));

const CustomDivider = styled(Divider)({
  backgroundColor: "#00A4C5",
  height: "0.7px",
  marginTop: "2%",
  marginBottom: "2%",
});

interface ProfileType {
  [key: string]: number | string | object | any;
}

const ZakatForm = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    if (
      typeof profile === "undefined" &&
      typeof id !== "undefined" &&
      id !== ""
    ) {
      fetch(`/api/form/amil/${id}`)
        .then((response) => response.json())
        .then((data: any) => {
          setProfile(data?.amil);
        })
        .catch((e: any) => {
          // setProfile({});
          console.error("Error: ", e);
        });
    }
  }, [id]);

  if (!profile) return <></>;

  return (
    <>
      <div className="rootContainer">
        <Container className="groupContainer">
          <Paper className="containerBox" elevation={3}>
            <Grid
              container
              spacing={2}
              display={"flex"}
              alignItems={"center"}
              pt={5}
            >
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                display={"flex"}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <img src={TulusLogo} alt="Logo Tulus" className="image" />
              </Grid>
              <Grid item xs={0} sm={4} md={4}></Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                display={"flex"}
                justifyContent={{ xs: "center", sm: "flex-end" }}
              >
                <img src={HiraLogo} alt="Logo Hira" className="image" />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div style={{ paddingTop: "50px" }}>
                  <Avatar
                    alt="Profile"
                    // src="/assets/profile_pic.png"
                    src={profile.photo ? profile.photo : null}
                    sx={{
                      display: "flex",
                      width: { xs: "100px", md: "150px" },
                      height: { xs: "100px", md: "150px" },
                      margin: "0 auto",
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={12} pb={5}>
                <CardContainer>
                  <CardContent>
                    <Box padding={"1%"}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="TP">
                            {profile?.amil_name
                              ? profile?.amil_name
                              : "UNKNOWN"}
                          </Typography>
                          <Typography className="TP">
                            {profile?.ic_no ? profile?.ic_no : "-"}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          paddingTop={"3%"}
                          paddingLeft={"5%"}
                          paddingRight={"5%"}
                          paddingBottom={"3%"}
                        >
                          <Grid item xs={12}>
                            <CustomDivider />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography className="TP">
                              Assalammualaikum, sila pilih amal jariah zakat
                              atau sedekah seperti dibawah.
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={2} pt={3}>
                              {/* <Grid item xs={12}>
                                <Button
                                  id="button1"
                                  variant="contained"
                                  component={Link}
                                  to={"/form/zakat/amil/" + id}
                                  sx={{
                                    backgroundColor: "#1C648C",
                                    color: "#white",
                                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                    width: { xs: "80%", md: "50%" },
                                    height: "50px",
                                  }}
                                >
                                  <Grid item xs={0.1} className="grid-item">
                                    <PaymentsIcon
                                      sx={{
                                        color: "white",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={11}>
                                    <Typography color={"white"}>
                                      ZAKAT
                                    </Typography>
                                  </Grid>
                                </Button>
                              </Grid> */}
                              <Grid item xs={12}>
                                <Button
                                  component={Link}
                                  to={"/form/sedekah/amil/" + id}
                                  id="button1"
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#1C648C",
                                    color: "#white",
                                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                    width: { xs: "80%", md: "50%" },
                                    height: "50px",
                                  }}
                                >
                                  <Grid item xs={0.1} className="grid-item">
                                    <VolunteerActivismIcon
                                      sx={{
                                        color: "white",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={11}>
                                    <Typography color={"white"}>
                                      SEDEKAH
                                    </Typography>
                                  </Grid>
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </CardContainer>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </>
  );
};
export default ZakatForm;
