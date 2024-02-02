import { ChangeEvent, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  IResolveParams,
} from "reactjs-social-login";

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";


const Login = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNext = () => {
    setTabValue(tabValue + 1);
  };

  return (
    <>
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
          <Typography variant="h5">¡Inicia sesión para continuar!</Typography>
        </Box>
      </Box>

      {/* Contenido */}
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", marginBottom: "4rem" }}>
          {/* <Tabs value={tabValue} centered>
            {renderTabs()}
          </Tabs> */}
        </Box>
        <Box>
          {/* {tabValue === 0 && ( */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              rowGap: "2rem",
            }}
          >
            <Box>
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
            </Box>
            <Box>
              <Typography variant="h5" align="left" gutterBottom>
                Ingresa tu contraseña
              </Typography>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </Box>

            <Button variant="contained" color="primary" onClick={handleNext}>
              Continuar
            </Button>
          </Box>
          {/* )} */}
        </Box>
      </Container>
    </>
  );
};

export default Login;
