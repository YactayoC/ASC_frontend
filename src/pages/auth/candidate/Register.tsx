import { useState } from "react";
import {
  Tab,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Tabs,
  IconButton,
  FormControl,
  InputAdornment,
} from "@mui/material";
import {
  ArrowBack,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormPostulant } from "../../../interfaces/Auth";
import useVerificationEmail from "../../../hooks/Email/useVerificationEmail";
import useAuth from "../../../hooks/Auth/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { sendVerificationEmail, verifyCodeEmail } = useVerificationEmail();
  const { registerCompleteCandidate } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormPostulant>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<RegisterFormPostulant> = (data) => {
    try {
      //handleNext();

      if (tabValue === 0) {
        handleSendVerificationEmail(data);
      }

      if (tabValue === 1) {
        handleVerifyCodeEmail(data)
      }

      if (tabValue === 2) {
        handleRegisterInfoCandidate(data)
      }
    }
    catch (error) {
      //console.log(error);
    }

  }

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
        />
      );
    }

    return tabs;
  };

  const handleSendVerificationEmail = async (data: any) => {
    try {
      const response = await sendVerificationEmail(data);
      //console.log(response);

      if (response?.ok) {
        handleNext();
      }

    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error al enviar el correo de verificación";
      setError('email', { type: 'manual', message: errorMessage });
    }
  }

  const handleVerifyCodeEmail = async (data: any) => {
    try {
      const response = await verifyCodeEmail(data);

      if (response?.ok) {
        handleNext();
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error al verificar el código de verificación";
      setError('email_code', { type: 'manual', message: errorMessage });
    }
  }

  const handleRegisterInfoCandidate = async (data: any) => {
    try {
      ////console.log(data)
      await registerCompleteCandidate(data);
      navigate("/");
      //localStorage.setItem("userInfo", JSON.stringify(response?.response.data));
      localStorage.setItem("isCompany", "false");
      localStorage.setItem("isAuthenticated", "true");

    } catch (error) {
      //console.log(error);
    }
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
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|pe|org|net|info|...)$/,
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
              <Button variant="contained" color="primary" type="submit" onClick={(e) => {
                e.preventDefault
              }}>
                Continuar
              </Button>

              <Link to="/auth/candidate/login">
                <Typography align="center" gutterBottom>
                  ¿Ya tienes una cuenta? Inicia sesión
                </Typography>
              </Link>
            </FormControl>
          )}
          {tabValue === 1 && (
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Verificación de cuenta
              </Typography>
              <Typography align="center" gutterBottom>
                Te enviamos un código a XXX@XXX.com. Recuerda revisar tu carpeta
                Spam o Notificaciones.
              </Typography>
              <Box>
                <TextField
                  label="Código de verificación"
                  variant="outlined"
                  fullWidth
                  {...register("email_code", {
                    required: "Debes ingresar el código de verificación",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se admiten números"
                    },
                    minLength: {
                      value: 6,
                      message: "El código debe tener 6 dígitos"
                    }
                  })}
                />

                {errors.email_code && (
                  <Typography color="error" align="left" gutterBottom>
                    {errors.email_code.message}
                  </Typography>
                )}
              </Box>
              <Button variant="contained" color="primary" type="submit" onClick={(e) => e.preventDefault}>
                Continuar
              </Button>
              <Button variant="outlined" color="primary">
                <Typography align="center" gutterBottom>
                  Reenviar código
                </Typography>

              </Button>
            </FormControl>
          )}
          {tabValue === 2 && (
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Registra tus datos
              </Typography>
              <Typography align="center" gutterBottom>
                Asociaremos este nombre con
              </Typography>
              <Box>
                <TextField
                  label="Nombres"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  {...register("nombres", {
                    required: "Debe ingresar sus nombres",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Solo se admiten letras",
                    },
                    maxLength: {
                      value: 50,
                      message: "Máximo 50 caracteres"
                    }
                  })}
                />
                {errors.nombres && (
                  <Typography color="error" align="left" gutterBottom>
                    {errors.nombres.message}
                  </Typography>
                )}
              </Box>
              <Box>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  type="text"
                  autoComplete="off"
                  fullWidth
                  {...register("apellidos", {
                    required: "Debe ingresar sus apellidos",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                      message: "Debe ingresar sus apellidos",
                    },
                    maxLength: {
                      value: 50,
                      message: "Máximo 50 caracteres"
                    }
                  })}
                />
                {errors.apellidos && (
                  <Typography color="error" align="left" gutterBottom>
                    {errors.apellidos.message}
                  </Typography>
                )}
              </Box>
              <Box>
                <TextField
                  label="Password"
                  variant="outlined"
                  autoComplete="onSubmit"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Debes ingresar una contraseña",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                      message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener mínimo 8 caracteres",
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
                {errors.password && (
                  <Typography color="error" align="left" gutterBottom>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>
              <Button variant="contained" color="primary" type="submit" onClick={(e) => {
                e.preventDefault
              }}>
                Continuar
              </Button>
            </FormControl>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Register;
