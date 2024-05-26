import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TulusLogo from "./../../assets/tulus-logo.png";
import HiraLogo from "./../../assets/hira-logo.png";

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

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ checked }) => ({
  ".MuiFormControlLabel-label": (checked && {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    color: "#1C648C",
  }) || {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    color: "#1C648C",
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const negeriList = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Kuala Lumpur",
  "Labuan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Putrajaya",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
];

const jenisZakat = [
  "Zakat Pendapatan",
  "Zakat Perniagaan",
  "Zakat Wang Simpanan",
  "Zakat Saham",
  "Zakat KWSP",
  "Zakat Emas",
  "Zakat Perak",
  "Qadha Zakat",
  "Zakat Harta",
];

interface ProfileType {
  [key: string]: number | string | object | any;
}

const ZakatForm = () => {
  const { id } = useParams();
  const idAsString = String(id);

  console.log(id);

  const [profile, setProfile] = useState<ProfileType>();

  const [formData, setFormData] = useState({
    //amil info
    amil_id: idAsString,
    amil_name: "",
    amil_email: "",
    amil_phone_no: "",
    amil_acc_no: "",
    amil_acc_name: "",
    //payer info
    payer_email: "",
    payer_name: "",
    tahun_haul: "",
    transaction_type: "",
    ic_type: "awam",
    ic_no: "",
    phone_no: "",
    address_1: "",
    address_2: "",
    address_3: "",
    postcode: "",
    state: "",
    amountZakat: "10",
    paymentMethod: "",
  });
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
    setRefNo(generateTimestamp() + "~" + JSON.stringify(formData));
  }, [formData]);

  const [isValidIcNumber, setIsValidIcNumber] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidPostalCode, setIsValidPostalCode] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [isValidIcType, setIsValidIcType] = useState(true);
  const [isValidAlamat1, setIsValidAlamat1] = useState(true);
  const [isAwam, setIsAwam] = useState(true);
  // const [isValidAlamat2, setIsValidAlamat2] = useState(true);
  // const [isValidAlamat3, setIsValidAlamat3] = useState(true);
  // const [isValidNegeri, setIsValidNegeri] = useState(true);
  // const [isValidJenisZakat, setIsValidJenisZakat] = useState(true);
  // const [isValidTahunHaul, setIsValidTahunHaul] = useState(true);
  const [isValidAmountZakat, setIsValidAmountZakat] = useState(true);
  // const [isValidPaymentType, setIsValidPaymentType] = useState(true);

  const validateIcNumber = (icNumber: string, type: string) => {
    let regex;
    switch (type) {
      case "awam":
        regex = /^[0-9]{12}$/;
        setIsAwam(true);
        break;
      case "tentera":
        regex = /^[0-9]{8}$/;
        setIsAwam(false);
        break;
      case "passport":
        regex = /^[0-9]{8}$/;
        setIsAwam(false);
        break;
      case "polis":
        regex = /^[0-9]{6}$/;
        setIsAwam(false);
        break;
      default:
        setIsAwam(true);
        return false;
    }
    return regex.test(icNumber);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phoneNumber);
  };
  const validatePostalCode = (postalCode: string) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(postalCode);
  };
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateFullname = (fullName: string) => {
    return fullName.trim() !== "";
  };

  const validateIcType = (icType: string) => {
    return icType.trim() !== "" && icType.trim() !== "none";
  };

  const validateField = (value: string) => {
    return value.trim() !== "" && value.trim() !== "none";
  };

  // Usage for each field
  const validateAlamat1 = (value: any) => validateField(value);
  // const validateAlamat2 = (value: any) => validateField(value);
  // const validateAlamat3 = (value: any) => validateField(value);
  // const validateNegeri = (value: any) => validateField(value);
  // const validateJenisZakat = (value: any) => validateField(value);
  // const validateTahunHaul = (value: any) => validateField(value);
  const validateAmountZakat = (value: any) => validateField(value);
  // const validatePaymentType = (value: any) => validateField(value);

  const handleIcNumberChange = (e: { target: { value: any } }) => {
    const icNumber = e.target.value;
    const type = formData.ic_type;
    setFormData({ ...formData, ic_no: icNumber });
    setIsValidIcNumber(validateIcNumber(icNumber, type));
  };

  const handlePhoneNumberChange = (e: { target: { value: any } }) => {
    const phoneNumber = e.target.value;
    setFormData({ ...formData, phone_no: phoneNumber });
    setIsValidPhoneNumber(validatePhoneNumber(phoneNumber));
  };

  const handlePostalCodeChange = (e: { target: { value: any } }) => {
    const postalCode = e.target.value;
    setFormData({ ...formData, postcode: postalCode });
    setIsValidPostalCode(validatePostalCode(postalCode));
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    const email = e.target.value;
    setFormData({ ...formData, payer_email: email });
    setIsValidEmail(validateEmail(email));
  };

  const handleFullNameChange = (e: { target: { value: any } }) => {
    const name = e.target.value;
    setFormData({ ...formData, payer_name: name });
    setIsValidFullName(validateFullname(name));
  };

  const handleIcTypeChange = (e: { target: { value: any } }) => {
    const icType = e.target.value;
    setFormData({ ...formData, ic_type: icType });
    if (icType === "awam") {
      setIsAwam(true);
    } else {
      setIsAwam(false);
    }
    setIsValidIcType(validateIcType(icType));
  };
  const handleAlamat1Change = (e: { target: { value: any } }) => {
    const alamat1 = e.target.value;
    setFormData({ ...formData, address_1: alamat1 });
    setIsValidAlamat1(validateAlamat1(alamat1));
  };
  const handleAmountZakatChange = (e: { target: { value: any } }) => {
    const amount = e.target.value;
    setFormData({ ...formData, amountZakat: amount });
    setIsValidAmountZakat(validateAmountZakat(amount));
  };

  // const handleChange = (fieldName: any, e: { target: { value: any } }) => {
  //   const value = e.target.value;
  //   setFormData({ ...formData, [fieldName]: value });

  //   switch (fieldName) {
  //     case "ic_no":
  //       setIsValidIcNumber(validateField(value));
  //       break;
  //     case "phone_no":
  //       setIsValidPhoneNumber(validateField(value));
  //       break;
  //     case "postcode":
  //       setIsValidPostalCode(validateField(value));
  //       break;
  //     case "email":
  //       setIsValidEmail(validateEmail(value));
  //     case "full_name":
  //       setIsValidFullName(validateFullname(value));
  //       break;
  //     case "ic_type":
  //       setIsValidIcType(validateIcType(value));
  //       break;
  //     case "alamat1":
  //       setIsValidAlamat1(validateField(value));
  //       break;
  //     case "alamat2":
  //       setIsValidAlamat2(validateField(value));
  //       break;
  //     case "alamat3":
  //       setIsValidAlamat3(validateField(value));
  //       break;
  //     case "negeri":
  //       setIsValidNegeri(validateField(value));
  //       break;
  //     case "jenis_zakat":
  //       setIsValidJenisZakat(validateField(value));
  //       break;
  //     case "tahun_haul":
  //       setIsValidTahunHaul(validateField(value));
  //       break;
  //     case "amount_zakat":
  //       setIsValidAmountZakat(validateField(value));
  //       break;
  //     case "payment_type":
  //       setIsValidPaymentType(validateField(value));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const icNumberRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const icTypeRef = useRef<HTMLInputElement | null>(null);
  const alamat1Ref = useRef<HTMLInputElement | null>(null);
  // const alamat2Ref = useRef<HTMLInputElement | null>(null);
  // const alamat3Ref = useRef<HTMLInputElement | null>(null);
  // const jenisZakatRef = useRef<HTMLInputElement | null>(null);
  // const tahunHaulRef = useRef<HTMLInputElement | null>(null);
  // const negeriRef = useRef<HTMLInputElement | null>(null);
  const amountZakatRef = useRef<HTMLInputElement | null>(null);
  // const paymentTypeRef = useRef<HTMLInputElement | null>(null);

  const checkValid = () => {
    if (!isValidIcNumber) {
      icNumberRef.current?.focus();
    } else if (!isValidPhoneNumber) {
      phoneNumberRef.current?.focus();
    } else if (!isValidPostalCode) {
      postalCodeRef.current?.focus();
    } else if (!isValidEmail) {
      emailRef.current?.focus();
    } else if (!isValidFullName) {
      fullNameRef.current?.focus();
    } else if (!isValidIcType) {
      icTypeRef.current?.focus();
    } else if (!isValidAlamat1) {
      alamat1Ref.current?.focus();
    } else if (!isValidAmountZakat) {
      amountZakatRef.current?.focus();
    }
  };
  const handleBayar = () => {
    console.log("here", formData);

    const apiUrl = "/api/form/submit";

    // Define the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    // Send the POST request
    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (
      typeof profile === "undefined" &&
      typeof id !== "undefined" &&
      id !== ""
    ) {
      console.log("here");
      fetch(`/api/form/amil/${id}`)
        .then((response) => response.json())
        .then((data: any) => {
          // console.log(data);
          setProfile(data?.amil);
          setFormData({
            amil_id: id,

            amountZakat: "10",

            amil_name: data?.amil?.amil_name || "Default Name",
            amil_email: data?.amil?.amil_email || "Default Email",
            amil_phone_no: data?.amil?.phone_no || "Default Phone",
            amil_acc_no: data?.amil?.acc_no || "Default Acc No",
            amil_acc_name: data?.amil?.acc_name || "Default Acc Name",
            //payer info
            payer_email: "",
            payer_name: "",
            tahun_haul: "",
            transaction_type: "",
            ic_type: "awam",
            ic_no: "",
            phone_no: "",
            address_1: "",
            address_2: "",
            address_3: "",
            postcode: "",
            state: "",
            paymentMethod: "",
          });
        })
        .catch((e) => {
          setProfile({});
          console.log(e);
        });
    }
  }, [profile, id]);

  const handleSelectChangeNegeri = (e: { target: { value: any } }) => {
    const selectedValue = String(e.target.value);
    setFormData({ ...formData, state: selectedValue });
  };
  const handleSelectChangeTahun = (e: { target: { value: any } }) => {
    const selectedValue = String(e.target.value);
    setFormData({ ...formData, tahun_haul: selectedValue });
  };
  const handleSelectChangeZakat = (e: { target: { value: any } }) => {
    const selectedValue = String(e.target.value);
    setFormData({ ...formData, transaction_type: selectedValue });
  };

  if (!profile) {
    return <>No data</>;
  } else {
    console.log(refNo);
  }

  console.log(profile);

  const requiredAsteriskStyle = {
    color: "red",
    marginLeft: "4px",
  };

  const isAnyRequirementInvalid =
    !isValidIcNumber ||
    !isValidPhoneNumber ||
    !isValidPostalCode ||
    !isValidEmail ||
    !isValidFullName ||
    !isValidIcType ||
    !isValidAlamat1 ||
    !isValidAmountZakat;

  const currentYear = new Date().getFullYear();
  const last5Years = Array.from(
    { length: 5 },
    (_, index) => currentYear - index
  );

  return (
    <>
      <Grid container spacing={1} display={"flex"} alignItems={"center"} pt={5}>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          display={"flex"}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <img className="image" src={TulusLogo} alt="Logo Tulus" />
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
          <Link to={`/amil/${id}`}>
            <div style={{ paddingTop: "50px" }}></div>
            <Button
              sx={{
                color: "white",
                display: "flex",
                alignitems: "flex-start",
                justifyContent: "center",
                marginBottom: { xs: "-20px", md: "-100px" },
              }}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Link>
        </Grid>
        <form
          action="https://pay.tulus.my/"
          method="POST"
          // onSubmit={handleBayar}
        >
          <>
            <input type="hidden" id="refNo" name="refNo" value={refNo} />
            <input type="hidden" id="amil_id" name="amil_id" value={id} />
            <input type="hidden" id="agency" name="agency" value="HIRA-00044" />
            <input
              type="hidden"
              id="returnUrl"
              name="returnUrl"
              value="https://hira.tuxgeo.dev/api/form/submit"
            />
          </>
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
          <Grid item xs={12} pb={5}>
            <CardContainer>
              <CardContent>
                <Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography className="TP">
                        {profile?.amil_name ? profile?.amil_name : "UNKNOWN"}
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
                      <Grid item xs={12} mb={2}>
                        <CustomDivider />
                      </Grid>
                      <Grid item xs={0} sm={3}>
                        {" "}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="TH1">
                          Pembayaran Zakat Melalui Hira' bagi Lembaga Zakat
                          Selangor
                        </Typography>
                      </Grid>
                      <Grid item xs={0} sm={3}></Grid>

                      <Grid item xs={12}>
                        <Typography className="TH2">
                          *sila isikan semua maklumat yang dikehendaki untuk
                          menunaikan zakat anda
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="t-bold">
                          Maklumat Pembayaran
                        </Typography>
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3} pb={0}>
                        <Typography className="t-normal">
                          <span style={requiredAsteriskStyle}>*</span>
                          Email
                        </Typography>
                        <input
                          type="text"
                          placeholder="Email pengguna"
                          id="email"
                          name="email"
                          onChange={handleEmailChange}
                          ref={emailRef}
                          required
                        />
                        {!isValidEmail && (
                          <p style={{ color: "red" }}>
                            Sila masukkan Email yang sah (e.g.,
                            test@example.com).
                          </p>
                        )}
                      </Grid>

                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">
                          <span style={requiredAsteriskStyle}>*</span>
                          Nama Penuh
                        </Typography>
                        <input
                          type="text"
                          name="payer_name"
                          id="payer_name"
                          placeholder="Nama Penuh pengeluar zakat (seperti dalam Kad Pengenalan)"
                          onChange={handleFullNameChange}
                          ref={fullNameRef}
                          required
                        />
                        {!isValidFullName && (
                          <p style={{ color: "red" }}>
                            Sila masukkan Name Penuh seperti dalam Kad
                            Pengenalan.
                          </p>
                        )}
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">
                          <span style={requiredAsteriskStyle}>*</span>
                          No. Kad Pengenalan
                        </Typography>
                        <Grid item xs={12} sm={6}>
                          <RadioGroup
                            ref={icTypeRef}
                            defaultValue={"awam"}
                            name="ic_type"
                            id="ic_type"
                            onChange={handleIcTypeChange}
                          >
                            <Box
                              display="flex"
                              flexDirection={{ xs: "column", sm: "row" }}
                              alignItems="flex-start"
                            >
                              <MyFormControlLabel
                                value="awam"
                                label="Awam"
                                defaultChecked
                                control={<Radio />}
                              />

                              <MyFormControlLabel
                                value="tentera"
                                label="Tentera"
                                control={<Radio />}
                              />

                              <MyFormControlLabel
                                value="polis"
                                label="Polis"
                                control={<Radio />}
                              />

                              <MyFormControlLabel
                                value="passport"
                                label="Passport"
                                control={<Radio />}
                              />
                              <MyFormControlLabel
                                value="none"
                                label="None"
                                control={<Radio />}
                                style={{ display: "none" }}
                              />
                            </Box>
                          </RadioGroup>
                        </Grid>
                        <input
                          name="ic_no"
                          id="ic_no"
                          type="text"
                          placeholder="No Kad Pengenalan/Passport/Tentera/Polis"
                          onChange={handleIcNumberChange}
                          ref={icNumberRef}
                          required
                        />
                        {!isValidIcNumber && (
                          <p style={{ color: "red", fontSize: "15px" }}>
                            Sila masukkan Nombor Kad Pengenalan yang sah{" "}
                            {isAwam ? "(12 nombor)" : "(8 nombor)"}
                          </p>
                        )}
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">
                          <span style={requiredAsteriskStyle}>*</span>
                          No. Telefon
                        </Typography>
                        <input
                          type="text"
                          name="phone_no"
                          id="phone_no"
                          placeholder="Contoh: 0129876543"
                          onChange={handlePhoneNumberChange}
                          ref={phoneNumberRef}
                          required
                        />
                        {!isValidPhoneNumber && (
                          <p style={{ color: "red" }}>
                            Sila masukkan No Telefon yang sah (e.g., 0123456789
                            or 01234567890).
                          </p>
                        )}
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-bold">
                          Alamat Pembayaran
                        </Typography>
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">
                          <span style={requiredAsteriskStyle}>*</span>
                          Alamat
                        </Typography>
                        <input
                          type="text"
                          name="address_1"
                          id="address_1"
                          placeholder="Alamat 1"
                          ref={alamat1Ref}
                          onChange={handleAlamat1Change}
                          required
                        />
                        {!isValidAlamat1 && (
                          <p style={{ color: "red" }}>
                            Sila masukkan Alamat anda.
                          </p>
                        )}
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">Alamat</Typography>
                        <input
                          type="text"
                          name="address_2"
                          id="address_2"
                          placeholder="Alamat 2 (optional)"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address_2: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">Alamat</Typography>
                        <input
                          type="text"
                          name="address_3"
                          id="address_3"
                          placeholder="Alamat 3 (optional)"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address_3: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={6}>
                          <Grid item xs={6}>
                            <Typography className="t-normal">
                              <span style={requiredAsteriskStyle}>*</span>
                              Poskod
                            </Typography>
                            <input
                              type="text"
                              name="postcode"
                              id="postcode"
                              placeholder="Poskod"
                              onChange={handlePostalCodeChange}
                              ref={postalCodeRef}
                              required
                            />
                            {!isValidPostalCode && (
                              <p style={{ color: "red" }}>
                                Sila masukkan Poskod yang sah (e.g., 12345).
                              </p>
                            )}
                          </Grid>
                          <Grid item xs={6}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                            >
                              <Grid item xs={12}>
                                <Typography className="t-normal">
                                  <span style={requiredAsteriskStyle}>*</span>
                                  Negeri
                                </Typography>
                              </Grid>
                              <Grid item xs={12} minWidth={"100%"}>
                                <select
                                  id="state"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleSelectChangeNegeri}
                                  required
                                >
                                  <option disabled value="">
                                    Pilih Negeri
                                  </option>
                                  {negeriList.map((negeri, index) => (
                                    <option key={index} value={negeri}>
                                      {negeri}
                                    </option>
                                  ))}
                                </select>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomDivider />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography className="t-bold">
                          Jenis Zakat Hendak Dibayar
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography className="t-normal">
                              <span style={requiredAsteriskStyle}>*</span>
                              Jenis Zakat
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item xs={12} minWidth={"100%"}>
                              <select
                                id="transaction_type"
                                name="transaction_type"
                                placeholder="Pilih Jenis Zakat"
                                value={formData.transaction_type}
                                onChange={handleSelectChangeZakat}
                              >
                                <option disabled value="">
                                  Pilih Jenis Zakat
                                </option>
                                {jenisZakat.map((zakat, index) => (
                                  <option key={index} value={zakat}>
                                    {zakat}
                                  </option>
                                ))}
                              </select>
                            </Grid>{" "}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            {" "}
                            <Typography className="t-normal">
                              <span style={requiredAsteriskStyle}>*</span>
                              Tahun Haul
                            </Typography>
                          </Grid>

                          {/* //todo */}
                          <Grid item xs={12} minWidth={"100%"}>
                            <select
                              id="tahun_haul"
                              name="tahun_haul"
                              placeholder="Pilih Jenis Zakat"
                              value={formData.tahun_haul}
                              onChange={handleSelectChangeTahun}
                            >
                              <option disabled value="">
                                Pilih Tahun Haul
                              </option>
                              {last5Years.map((tahun, index) => (
                                <option key={index} value={tahun}>
                                  {tahun}
                                </option>
                              ))}
                            </select>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} pr={3} pl={3}>
                        <Typography className="t-normal">
                          {" "}
                          <span style={requiredAsteriskStyle}>*</span>
                          Amount Zakat
                        </Typography>
                        <input
                          type="text"
                          id="amount"
                          name="amount"
                          placeholder="RM 0.00"
                          ref={amountZakatRef}
                          inputMode="numeric"
                          onKeyPress={(e) => {
                            const validInput = /[0-9.]/.test(e.key);
                            if (!validInput) {
                              e.preventDefault();
                            }
                          }}
                          onChange={handleAmountZakatChange}
                          required
                        />
                        {!isValidAmountZakat && (
                          <p style={{ color: "red" }}>
                            Silah masukkan Amount Zakat.
                          </p>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <Card
                          sx={{
                            background: "#E4E4E4",
                            width: "100%",
                            height: "60px",
                            borderTopRightRadius: "20px",
                            borderTopLeftRadius: "20px",
                            borderBottomRightRadius: "none",
                            borderBottomLeftRadius: "none",

                            border: "1px solid gray",
                          }}
                        >
                          {/* //todo */}
                          <Typography
                            fontSize="18px"
                            variant="body1"
                            align="left"
                            paddingY="9px"
                            paddingX="20px"
                            fontFamily="Poppins, sans-serif"
                            fontWeight={600}
                            color={"#004C5B"}
                          >
                            Lafaz Akad
                          </Typography>
                        </Card>
                        <Card
                          sx={{
                            background: "white",
                            width: "100%",
                            height: "0",
                            border: "1px solid gray",
                            boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.4)",
                            borderRadius: "0px",
                            marginTop: "-20px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            paddingLeft="7px"
                            margin={"1.4%"}
                            display="flex"
                            justifyContent={"left"}
                            fontFamily="Poppins, sans-serif"
                            fontWeight={400}
                            color={"#1C648C"}
                          >
                            Inilah wang RM10.00 sebagai menunaikan zakat yang
                            wajib ke atas diri saya kerana Allah Ta'ala
                          </Typography>
                        </Card>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography className="t-bold">
                          Pilih Cara Bayaran
                        </Typography>
                        <Box display={"flex"} alignItems={"flex-start"}>
                          <Radio
                            checked={true}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                paymentMethod: e.target.value,
                              })
                            }
                            value="FPX Online Banking"
                            name="paymentMethod"
                            id="paymentMethod"
                            title="name"
                            inputProps={{
                              "aria-label": "FPX Online Banking",
                            }}
                            required
                          />

                          <Typography
                            variant="body2"
                            align="left"
                            margin={"12px"}
                            fontFamily="Poppins, sans-serif"
                            fontWeight={400}
                            color={"#1C648C"}
                          >
                            FPX Online Banking
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="t-normal">
                          Pembayaran secara FPX menggunakan akaun Internet
                          Banking. Semua Perbankan utama di Malaysia menerima
                          kaedah pembayaran FPX ini.
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={2} pt={3}>
                          <Grid item xs={6}>
                            <Button
                              variant="outlined"
                              fullWidth
                              component={Link}
                              to={"/amil/" + id}
                              sx={{
                                borderColor: "#1C648C",
                                color: "#1C648C",
                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              BATAL
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            {isAnyRequirementInvalid && (
                              <Button
                                id="button1"
                                variant="contained"
                                fullWidth
                                sx={{
                                  backgroundColor: "#1C648C",
                                  color: "white",
                                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                }}
                                onClick={checkValid}
                              >
                                BAYAR
                              </Button>
                            )}
                            {!isAnyRequirementInvalid && (
                              <Button
                                id="button2"
                                type="submit"
                                variant="contained"
                                fullWidth
                                onClick={handleBayar}
                                sx={{
                                  backgroundColor: "#1C648C",
                                  color: "white",
                                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                                }}
                              >
                                BAYAR
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
        </form>
      </Grid>
    </>
  );
};
export default ZakatForm;
