import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
  FormControl,
  InputAdornment
} from "@mui/material";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../../../interfaces/Auth"

import useAuth from "../../../hooks/Auth/useAuth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { loginCandidate } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmitData: SubmitHandler<LoginForm> = (data) => {
    handleLogin(data);
  };

  const handleLogin = async (dataForm: LoginForm) => {
    try {
      const response = await loginCandidate(dataForm);
      console.log(response?.response)

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isCompany", "false");
      navigate("/");
    }
    catch (error: any) {
      //console.log(error);
      const errorMessage = error?.response?.data?.message || "Correo o contraseña incorrectos";
      setError("email", {
        type: "manual",
        message: errorMessage,
      });
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
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

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "2rem",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmitData)}
        >
          <Box>
            <Typography variant="h5" align="left" gutterBottom>
              Ingresa tu correo electrónico
            </Typography>
            <Box>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Debes ingresar un correo electrónico",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Debes ingresar un correo electrónico válido",
                  },
                })
                }
              />
              {errors.email && (
                <Typography variant="caption" color="error">
                  {errors.email.message}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="h5" align="left" gutterBottom>
              Ingresa tu contraseña
            </Typography>
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Debes ingresar una contraseña",
                minLength: {
                  value: 6, // Asegúrate de que el valor mínimo coincida con el mensaje de error
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button variant="contained" color="primary" type="submit" onClick={(e) => e.preventDefault}>
            Continuar
          </Button>
        </FormControl>

      </Container>
    </>
  );
};

export default Login;
