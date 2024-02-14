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
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../../../interfaces/Auth"

const Login = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
        </Box>
        <Box>
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
                type="password"
                value={passwrod}
                onChange={handlePasswordChange}
              />
            </Box>

            <Button variant="contained" color="primary" onClick={handleNext}>
              Continuar
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
