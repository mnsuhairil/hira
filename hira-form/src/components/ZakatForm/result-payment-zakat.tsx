import { Button, Container, Paper } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HiraLogo from "./../../assets/hira-logo.png";
import TulusLogo from "./../../assets/tulus-logo.png";
const CardContainer = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface PaymentDataType {
  [key: string]: number | string | object | any;
}

const ResultPaymentZakat = () => {
  const { ref_no } = useParams();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentDataType | null>(null);
  // const [transactionStatus, setTransactionStatus] = useState<string | null>(
  //   null
  // );

  useEffect(() => {
    setLoading(true);

    if (!ref_no) return;

    fetch(`/api/form/receipt/${ref_no}`)
      .then((response) => response.json())
      .then((data) => {
        setPaymentData(data?.data);
        setLoading(false);
      })
      .catch((e) => {
        // setPaymentData({});
        console.error(e);
      });

    return () => {
      setLoading(true);
      setPaymentData(null);
    };
  }, [ref_no]);

  const contentStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  };

  const centerAlign = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const boxInput = {
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: "10px",
    borderRadius: "0.25rem",
  };

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        paymentData && (
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
                  <Grid item xs={12} pb={5}>
                    <CardContainer>
                      <CardContent>
                        <Box>
                          <Grid container>
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              paddingTop={"3%"}
                              paddingLeft={"5%"}
                              paddingRight={"5%"}
                              paddingBottom={"3%"}
                            >
                              {/* result card */}
                              <Grid item xs={12} py={2}>
                                <Alert
                                  severity={
                                    paymentData.fpx_status === "success"
                                      ? "success"
                                      : "error"
                                  }
                                  sx={{ maxWidth: "100%", padding: "8px" }}
                                >
                                  {paymentData.fpx_status === "success"
                                    ? "Transaksi Berjaya"
                                    : "Transaksi Tidak Berjaya"}
                                </Alert>
                              </Grid>

                              <Grid item xs={12}>
                                <Card
                                  sx={{
                                    backgroundColor: "white",
                                    paddingY: "10px",
                                    boxShadow:
                                      "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <CardContent sx={{ padding: "2rem" }}>
                                    <Grid
                                      item
                                      xs={12}
                                      display={"flex"}
                                      alignItems={"center"}
                                      justifyContent={"center"}
                                    >
                                      <Typography className="title">
                                        STATUS PEMBAYARAN
                                      </Typography>
                                    </Grid>
                                    {paymentData && (
                                      <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            sx={centerAlign}
                                          >
                                            <Grid
                                              item
                                              xs={12}
                                              sm={2.5}
                                              style={contentStyle}
                                              className="t-normal-bold"
                                            >
                                              Nombor Rujukan
                                            </Grid>

                                            <Grid
                                              item
                                              xs={12}
                                              sm={9.5}
                                              style={contentStyle}
                                              className="t-normal"
                                            >
                                              <Box sx={boxInput}>
                                                {paymentData.ref_no}
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                <Grid
                                  container
                                  direction="row"
                                  sx={centerAlign}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    sm={2.5}
                                    style={contentStyle}
                                    className="t-normal-bold"
                                  >
                                    Id Amil
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={9.5}
                                    style={contentStyle}
                                    className="t-normal"
                                  >
                                    <Box sx={boxInput}>
                                      {transaction.id}
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid> */}
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            sx={centerAlign}
                                          >
                                            <Grid
                                              item
                                              xs={12}
                                              sm={2.5}
                                              style={contentStyle}
                                              className="t-normal-bold"
                                            >
                                              Nama Pembayar
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={9.5}
                                              style={contentStyle}
                                              className="t-normal"
                                            >
                                              <Box sx={boxInput}>
                                                {paymentData.payer_name || "-"}
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            sx={centerAlign}
                                          >
                                            <Grid
                                              item
                                              xs={12}
                                              sm={2.5}
                                              style={contentStyle}
                                              className="t-normal-bold"
                                            >
                                              Jumlah Amaun
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={9.5}
                                              style={contentStyle}
                                              className="t-normal"
                                            >
                                              <Box sx={boxInput}>
                                                RM {paymentData.amount || "-"}
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            sx={centerAlign}
                                          >
                                            <Grid
                                              item
                                              xs={12}
                                              sm={2.5}
                                              style={contentStyle}
                                              className="t-normal-bold"
                                            >
                                              Nombor Pesanan
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={9.5}
                                              style={contentStyle}
                                              className="t-normal"
                                            >
                                              <Box sx={boxInput}>
                                                {paymentData.order_no || "-"}
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            sx={centerAlign}
                                          >
                                            <Grid
                                              item
                                              xs={12}
                                              sm={2.5}
                                              style={contentStyle}
                                              className="t-normal-bold"
                                            >
                                              Agensi
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={9.5}
                                              style={contentStyle}
                                              className="t-normal"
                                            >
                                              {" "}
                                              <Box sx={boxInput}>
                                                {paymentData.agency || "-"}{" "}
                                              </Box>
                                            </Grid>{" "}
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            sx={centerAlign}
                                          >
                                            <Grid
                                              item
                                              xs={12}
                                              sm={2.5}
                                              style={contentStyle}
                                              className="t-normal-bold"
                                            >
                                              Status FPX
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sm={9.5}
                                              style={contentStyle}
                                              className="t-normal"
                                            >
                                              <Box
                                                sx={boxInput}
                                                textTransform={"capitalize"}
                                              >
                                                {paymentData.fpx_status}
                                                {/* {transactionStatus === "success"
                                        ? "Success"
                                        : transactionStatus === "error"
                                        ? "Failed"
                                        : "Pending"} */}
                                              </Box>
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        {/* <Grid item xs={12}>
                                <Typography
                                  className="t-normal"
                                  textAlign={"center"}
                                >
                                  Setinggi-tinggi terima kasih atas
                                  pembayaran anda yang berjaya.
                                </Typography>
                              </Grid> */}
                                      </Grid>
                                    )}
                                  </CardContent>
                                </Card>
                              </Grid>

                              <Grid item xs={12} pt={4}>
                                <Button
                                  id="btn-kembali"
                                  variant="contained"
                                  component={Link}
                                  to={`/amil/${
                                    paymentData.agen_id === 34
                                      ? "hirahq"
                                      : paymentData.agen_id
                                  }`}
                                  fullWidth
                                  sx={{
                                    backgroundColor: "#1C648C",
                                    color: "white",
                                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                    height: "40px",
                                  }}
                                >
                                  KEMBALI
                                </Button>
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
        )
      )}
    </>
  );
};

export default ResultPaymentZakat;
