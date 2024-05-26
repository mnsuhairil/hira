import { Container, Paper, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HiraLogo from "./../../assets/hira-logo.png";
import TulusLogo from "./../../assets/tulus-logo.png";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const CardContainer = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

interface PaymentInfoType {
  [key: string]: number | string | object | any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ResultPaymentSedekah = () => {
  const { ref_no } = useParams();
  console.log(ref_no);

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType | undefined>(
    undefined
  );
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (
      typeof paymentInfo === "undefined" &&
      typeof ref_no !== "undefined" &&
      ref_no !== ""
    ) {
      console.log("Fetching payment data...");
      fetch(`/api/form/receipt/${ref_no}`)
        .then((response) => response.json())
        .then((data: any) => {
          setPaymentInfo(data?.data);
        })
        .catch((e) => {
          setPaymentInfo({});
          console.error(e);
        });
    }
  }, [paymentInfo, ref_no]);

  console.log("Payment data: ", paymentInfo);

  useEffect(() => {
    if (!paymentInfo) return;

    const transactionStatus = paymentInfo.fpx_status;

    if (transactionStatus === "failed") {
      setTransactionStatus("error");
    } else if (transactionStatus === "pending") {
      setTransactionStatus("warning");
    } else if (transactionStatus === "success") {
      setTransactionStatus("success");
    }
  }, [paymentInfo]);

  if (!paymentInfo) return <></>;
  const boxStyle = {
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: "10px",
    borderRadius: "0.25rem",
  };
  const contentStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  };

  if (!paymentInfo) return <>No payment data</>;

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
                          {/* resultpayment */}
                          {/* result card */}
                          <Grid item xs={12} py={2}>
                            <Alert
                              severity={
                                transactionStatus === "success"
                                  ? "success"
                                  : transactionStatus === "error"
                                  ? "error"
                                  : "warning"
                              }
                              sx={{ maxWidth: "100%", padding: "8px" }}
                            >
                              {transactionStatus === "success"
                                ? "Transaksi Berjaya"
                                : transactionStatus === "error"
                                ? "Transaksi Tidak Berjaya"
                                : "Transaksi Belum Selesai"}
                            </Alert>
                          </Grid>
                          <Grid xs={12}>
                            <Card
                              sx={{
                                backgroundColor: "white",
                              }}
                            >
                              <CardContent>
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
                                {paymentInfo && (
                                  <Grid container spacing={2}>
                                    {/* Card Content */}
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        spacing={3}
                                        direction="row"
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          style={contentStyle}
                                          className="t-normal-bold"
                                        >
                                          Nombor Rujukan
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={9}
                                          style={contentStyle}
                                          className="t-normal"
                                        >
                                          <Box sx={boxStyle}>
                                            {paymentInfo.ref_no}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        spacing={3}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignContent="flex-start"
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          style={contentStyle}
                                          className="t-normal-bold"
                                        >
                                          Nama Pembayar
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={9}
                                          style={contentStyle}
                                          className="t-normal"
                                        >
                                          <Box sx={boxStyle}>
                                            {paymentInfo.payer_name || "-"}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        spacing={3}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignContent="flex-start"
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          style={contentStyle}
                                          className="t-normal-bold"
                                        >
                                          Jumlah Amaun
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={9}
                                          style={contentStyle}
                                          className="t-normal"
                                        >
                                          <Box sx={boxStyle}>
                                            RM {paymentInfo.amount || "-"}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        spacing={3}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignContent="flex-start"
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          style={contentStyle}
                                          className="t-normal-bold"
                                        >
                                          Nombor Pesanan
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={9}
                                          style={contentStyle}
                                          className="t-normal"
                                        >
                                          <Box sx={boxStyle}>
                                            {paymentInfo.order_no || "-"}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        spacing={3}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignContent="flex-start"
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          style={contentStyle}
                                          className="t-normal-bold"
                                        >
                                          Agensi
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={9}
                                          style={contentStyle}
                                          className="t-normal"
                                        >
                                          <Box sx={boxStyle}>
                                            {paymentInfo.agency || "-"}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        spacing={2.5}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignContent="flex-start"
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          sm={3}
                                          style={contentStyle}
                                          className="t-normal-bold"
                                        >
                                          Status FPX
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={9}
                                          style={contentStyle}
                                          className="t-normal"
                                        >
                                          <Box sx={boxStyle}>
                                            {transactionStatus === "success"
                                              ? "Success"
                                              : transactionStatus === "error"
                                              ? "Failed"
                                              : "Pending"}
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
                              </CardContent>
                            </Card>
                            <Grid item xs={12}>
                              <Grid container paddingTop="2%"></Grid>
                              <Button
                                component={Link}
                                to={"/amil/"}
                                sx={{
                                  backgroundColor: "#004C5B",
                                  color: "white",
                                  borderRadius: "5px",
                                  fontSize: "15px",
                                  padding: "1.3%",
                                  width: "100%",
                                  fontWeight: "600",
                                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                                  "&:active": {
                                    backgroundColor: "#004C5B",
                                  },
                                  "&:hover": {
                                    backgroundColor: "#004C5B",
                                    color: "white",
                                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
                                  },
                                }}
                              >
                                Kembali
                              </Button>
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
export default ResultPaymentSedekah;
