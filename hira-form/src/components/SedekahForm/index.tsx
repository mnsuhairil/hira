import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import tulusLogo from "../../assets/tulus-logo.png";
import logoHIRA from "../../assets/hira-logo.png";
import budakSek from "../../assets/budak_ikrar.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const path = import.meta.env.VITE_URL_FORM;

const ContentBox = styled(Paper)(() => ({
  background: "rgba(0, 0, 0, 0)",
  textAlign: "center",
  position: "relative",
  boxShadow: "none",
  paddingX: "20px",
  paddingBottom: "50px",
}));

const CardContainer = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 255)",
  borderRadius: "20px",
}));

const BoxContent = styled(Paper)(() => ({
  background: "white",
  boxShadow: "none",
  paddingTop: "10%",
  paddingBottom: "13%",
  paddingX: "10px",
  width: "100%",
  height: "100%",
}));

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(17),
  height: theme.spacing(17),
  margin: "0 auto",
}));

const CustomDivider = styled(Divider)({
  backgroundColor: "#004C5B",
  height: "0.7px",
  marginTop: "5px",
  marginBottom: "5px",
});

interface ProfileType {
  [key: string]: number | string | object | any;
}

function SedekahForm() {
  const { id } = useParams();
  const theme = useTheme();
  const [picture, setPicture] = useState<string>("");
  const [profile, setProfile] = useState<ProfileType>();
  const [formData, setFormData] = useState({
    amil_id: id,
    payer_email: "",
    amount: "10",
    transaction_type: "Sedekah",
    amil_name: "",
    amil_email: "",
    amil_phone_no: "",
    amil_acc_no: "",
    amil_acc_name: "",
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setFormData({
      ...formData,
      amount: inputValue,
    });
  };

  const [refNo, setRefNo] = useState("");

  function generateTimestamp() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    return year + month + day + hours + minutes + seconds + milliseconds;
  }

  useEffect(() => {
    let idParam = id;
    if (id === "hirahq") {
      idParam = "1a293810-05b4-4e67-83a4-2033df0dba6c";
    }

    fetch(`/api/picture/user/${idParam}`)
      .then((response) => response.json())
      .then((data: any) => {
        if (data.metadata.status === "ERROR") {
          console.error("ERROR: ", data.metadata.message);
          return;
        }
        setPicture(data.data.url);
      })
      .catch((e: any) => {
        console.error("Error: ", e);
      });
  }, [id]);

  useEffect(() => {
    setRefNo(generateTimestamp() + "~" + JSON.stringify(formData));
  }, [formData]);

  const handleBayar = () => {
    const apiUrl = "/api/form/submit";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  useEffect(() => {
    let idParam = id;
    if (id === "hirahq") {
      idParam = "1a293810-05b4-4e67-83a4-2033df0dba6c";
    }

    fetch(`/api/form/amil/${idParam}`)
      .then((response) => response.json())
      .then((data: any) => {
        setProfile(data?.amil);
        setFormData({
          amil_id: id,
          payer_email: "",
          amount: "10",
          transaction_type: "Sedekah",
          amil_name: data?.amil?.amil_name || "Default Name",
          amil_email: data?.amil?.amil_email || "Default Email",
          amil_phone_no: data?.amil?.phone_no || "Default Phone",
          amil_acc_no: data?.amil?.acc_no || "Default Acc No",
          amil_acc_name: data?.amil?.acc_name || "Default Acc Name",
        });
      })
      .catch((e) => {
        setProfile({});
        console.error(e);
      });
  }, [id]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!profile) {
    return <>No data</>;
  }

  return (
    <>
      <div className="rootContainer">
        <Container
          className="groupContainer"
          sx={{ padding: { xs: "0px", sm: "10px" } }}
        >
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
                <img src={tulusLogo} alt="Logo Tulus" className="image" />
              </Grid>
              <Grid item xs={0} sm={4} md={4}></Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                display={"flex"}
                justifyContent={{ xs: "center", sm: "flex-end" }}
              ></Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                paddingBottom: "1%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                component={Link}
                to={"/agen/" + id}
                startIcon={<ArrowBackIcon />}
                style={{
                  paddingTop: "4%",
                  color: "white",
                  borderColor: "white",
                }}
              >
                Back
              </Button>
            </Grid>

            <ContentBox>
              {/*BOX PUTIH*/}
              <CardContainer>
                <Box
                  sx={{
                    display: "flex",
                    gridTemplateRows: "1fr",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0px",
                    width: "100%",
                  }}
                >
                  <form action="https://pay.tulus.my/" method="POST">
                    <Grid container direction={"row"} width={"100%"}>
                      <Grid item xs={0} md={5.2}>
                        <Card
                          sx={{
                            borderRadius: "20px",
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                          }}
                        >
                          {!isSmallScreen && (
                            <img
                              src={budakSek}
                              alt="image"
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                display: "block",
                              }}
                            />
                          )}
                        </Card>
                      </Grid>

                      <Grid item md={6.8}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            height: "30%",
                          }}
                        >
                          <Box
                            sx={{
                              width: "80%",
                              height: "100%",
                              background: "white",
                            }}
                          >
                            <BoxContent>
                              <Grid
                                container
                                spacing={1}
                                direction="column"
                                justifyContent="flex-start"
                                alignContent="flex-start"
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignContent="flex-start"
                                  >
                                    <Grid item xs={12} sm={12} md={5}>
                                      <Box
                                        sx={{
                                          width: "96%",
                                          backgroundColor: "#004C5B",
                                          borderRadius: "16px",
                                          boxShadow:
                                            "0px 3px 8px rgba(0, 0, 0, 0.3);",
                                        }}
                                      >
                                        <img
                                          src={logoHIRA}
                                          width={"80%"}
                                          height={"75%"}
                                          style={{
                                            margin: "4%",
                                            paddingTop: "1.5%",
                                          }}
                                        />
                                      </Box>
                                    </Grid>

                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={7}
                                      color={"#000"}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Typography className="header">
                                        Pembayaran Sedekah Melalui Tulus bagi
                                        Institusi Pendidikan HIRA'
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={5}>
                                  {id === "hirahq" ||
                                  id === "34" ||
                                  id ===
                                    "1a293810-05b4-4e67-83a4-2033df0dba6c" ? null : (
                                    <Grid
                                      container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignContent="flex-start"
                                      paddingTop="5%"
                                    >
                                      <Grid
                                        item
                                        xs={3}
                                        height={"100%"}
                                        minWidth={140}
                                      >
                                        <div
                                          style={{
                                            position: "relative",
                                            paddingTop: "65%",
                                          }}
                                        >
                                          <ProfileImage
                                            src={picture ? picture : ""}
                                            className="img-amil"
                                            style={{
                                              width: theme.spacing(13),
                                              height: theme.spacing(13),
                                            }}
                                          />
                                        </div>
                                      </Grid>

                                      <Grid item xs={12} sm={7} md={7}>
                                        <Grid
                                          item
                                          color={"#000"}
                                          sx={{
                                            display: "flex",
                                            alignItems: "left",
                                            textAlign: "left",
                                          }}
                                        >
                                          <Typography className="amil">
                                            Agen yang bertugas
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          color={"#000"}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "left",
                                          }}
                                        >
                                          <Typography className="name">
                                            {profile?.amil_name
                                              ? profile?.amil_name
                                              : "UNKNOWN"}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignContent="flex-start"
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    container
                                    spacing={2}
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignContent="flex-start"
                                  >
                                    <Grid item xs={12} sm={6} md={6}>
                                      <Grid
                                        item
                                        color={"#000"}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          textAlign: "justify",
                                        }}
                                      >
                                        <Typography className="title">
                                          Mengenai Kami
                                        </Typography>
                                      </Grid>

                                      <Grid item xs={12}>
                                        <CustomDivider />
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      item
                                      xs={12}
                                      color={"#000"}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Typography className="content1">
                                        <span className="c-bold">
                                          IPH (INSTITUSI PENDIDIKAN HIRA')
                                        </span>
                                        <span className="c-semibold">
                                          {" "}
                                          merupakan sebuah institusi yang
                                          menaungi
                                        </span>

                                        <span className="c-bold">
                                          {" "}
                                          Sekolah Rendah Islam Hira, Sekolah
                                          Menengah Islam Hira’
                                        </span>
                                        <span className="c-semibold"> dan</span>

                                        <span className="c-bold">
                                          {" "}
                                          Maahad Tahfiz Al-Quran Hira’.
                                        </span>
                                        <span className="c-semibold">
                                          {" "}
                                          IPH komited terhadap pendidikan Islam
                                          mulai dari peringkat Nurseri, Sekolah
                                          Rendah, Sekolah Menengah dan Maahad
                                          Tahfiz. Komitmen ini merupakan
                                          sumbangan IPH untuk pembangunan ummah.
                                        </span>
                                      </Typography>
                                    </Grid>

                                    <Grid
                                      item
                                      xs={12}
                                      color={"#000"}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Typography className="content2">
                                        <span className="c-semibold">
                                          *Sila isikan semua maklumat yang
                                          dikehendaki untuk menunaikan sedekah
                                          anda
                                        </span>
                                      </Typography>
                                    </Grid>

                                    <input
                                      type="hidden"
                                      id="refNo"
                                      name="refNo"
                                      value={refNo}
                                    />
                                    <input
                                      type="hidden"
                                      id="transaction_type"
                                      name="transaction_type"
                                      value="Sedekah"
                                    />
                                    <input
                                      type="hidden"
                                      id="agency"
                                      name="agency"
                                      value="HIRASDQ"
                                    />
                                    <input
                                      type="hidden"
                                      id="returnUrl"
                                      name="returnUrl"
                                      value={`${path}/api/form/submit`}
                                    />
                                    <Grid
                                      item
                                      xs={12}
                                      color={"#000"}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Typography className="textBox1">
                                        Emel*
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Grid item xs={12}>
                                        <FormControl className="formControl">
                                          <OutlinedInput
                                            placeholder="example@example.com"
                                            required
                                            value={formData.payer_email}
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={(e) =>
                                              setFormData({
                                                ...formData,
                                                payer_email: e.target.value,
                                              })
                                            }
                                            sx={{
                                              paddingLeft: "2%",
                                              fontFamily: "Poppins, sans-serif",
                                              boxShadow:
                                                "0px 3px 7px rgba(0, 0, 0, 0.2)",
                                              borderRadius: "12px",
                                              fontSize: "14px",
                                            }}
                                          />
                                        </FormControl>
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      item
                                      xs={12}
                                      color={"#000"}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Typography className="textBox2">
                                        Amaun Sedekah*
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                      <FormControl className="formControl">
                                        <OutlinedInput
                                          required
                                          placeholder="Masukkan amaun sedekah"
                                          type="input"
                                          id="amount"
                                          name="amount"
                                          inputMode="numeric"
                                          value={formData.amount}
                                          onKeyPress={(e) => {
                                            const validInput = /[0-9.]/.test(
                                              e.key
                                            );
                                            if (!validInput) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onChange={handleAmountChange}
                                          sx={{
                                            paddingLeft: "2%",
                                            fontFamily: "Poppins, sans-serif",
                                            boxShadow:
                                              "0px 3px 7px rgba(0, 0, 0, 0.2)",
                                            borderRadius: "12px",
                                            fontSize: "14px",
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        columnSpacing={5}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignContent="flex-start"
                                        paddingTop="3%"
                                      >
                                        <Grid item xs={6}>
                                          <Button
                                            variant="outlined"
                                            component={Link}
                                            to={"/amil/" + id}
                                            type="button"
                                            className="button-batal"
                                          >
                                            BATAL
                                          </Button>
                                        </Grid>

                                        <Grid item xs={6}>
                                          <Button
                                            className="button-bayar"
                                            onClick={handleBayar}
                                            type="submit"
                                          >
                                            BAYAR
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </BoxContent>
                          </Box>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </CardContainer>
            </ContentBox>
          </Paper>
        </Container>
      </div>
    </>
  );
}
export default SedekahForm;
