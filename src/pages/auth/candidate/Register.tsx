import { ChangeEvent, useState } from "react";
import {
  Tab,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Tabs,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../../theme";

const Register = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  //   const handleChange = (event, newValue: number) => {
  //     setTabValue(newValue);
  //   };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleVerificationCodeChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };

  const handleNext = () => {
    setTabValue(tabValue + 1);
  };

  const renderTabs = () => {
    const tabs = [];

    for (let i = 0; i < 3; i++) {
      tabs.push(
        <Tab
          key={i}
          icon={
            i === tabValue ? (
              <RadioButtonChecked color="primary" />
            ) : (
              <RadioButtonUnchecked />
            )
          }
        //   onClick={(e) => handleChange(e, i)}
        />
      );
    }

    return tabs;
  };

  const handleRegister = () => {
    navigate("/");
    localStorage.setItem("isCompany", "false");
    localStorage.setItem("isAuthenticated", "true");
  }

  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          backgroundColor: "#eaf3fb",
          padding: "20px",
          textAlign: "center",
          position: "relative",
          width: "100%",
          height: "10rem",
        }}
      >
        <IconButton
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10%",

            [theme.breakpoints.down("sm")]: {
              top: "20%",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",

            [theme.breakpoints.down("sm")]: {
              paddingTop: "2rem",
            },
          }}
        >
          <img
            src="/auth.svg"
            alt="Auth"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <Typography variant="h5">¡Empieza a crear tu cuenta!</Typography>
        </Box>
      </Box>

      {/* Contenido */}
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", marginBottom: "4rem" }}>
          <Tabs value={tabValue} centered>
            {renderTabs()}
          </Tabs>
        </Box>
        <Box>
          {tabValue === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" align="left" gutterBottom>
                Ingresa tu correo electrónico
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
              <Button variant="contained" color="primary" onClick={handleNext}>
                Continuar
              </Button>
              <Link to="/auth/candidate/login">
                <Typography align="center" gutterBottom>
                  ¿Ya tienes una cuenta? Inicia sesión
                </Typography>
              </Link>
            </Box>
          )}
          {tabValue === 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Verificación de cuenta
              </Typography>
              <Typography align="center" gutterBottom>
                Te enviamos un código a XXX@XXX.com. Recuerda revisar tu carpeta
                Spam o Notificaciones.
              </Typography>
              <TextField
                label="Código de verificación"
                variant="outlined"
                fullWidth
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
              <Button variant="contained" color="primary" onClick={handleNext}>
                Continuar
              </Button>
              <Button variant="outlined" color="primary">
                <Typography align="center" gutterBottom>
                  Reenviar código
                </Typography>
              </Button>
            </Box>
          )}
          {tabValue === 2 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Registra tus datos
              </Typography>
              <Typography align="center" gutterBottom>
                Asociaremos este nombre con
              </Typography>
              <TextField label="Nombres" variant="outlined" fullWidth />
              <TextField label="Apellidos" variant="outlined" fullWidth />
              <TextField label="Password" variant="outlined" fullWidth />
              <Button variant="contained" color="primary" onClick={handleRegister}>
                Continuar
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Register;
