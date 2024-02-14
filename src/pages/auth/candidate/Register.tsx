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
  FormControl,
} from "@mui/material";
import {
  ArrowBack,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormPostulant } from "../../../interfaces/Auth";

const Register = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormPostulant>();

  const onSubmit: SubmitHandler<RegisterFormPostulant> = (data) => {
    handleNext();
    console.log(data);
  }

  const handleInputsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setVerificationCode(event.target.value);

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
                  value={email}
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  onChange={handleInputsChange}
                />
                {errors.email && (
                  <Typography color="error" align="left" gutterBottom>
                    Debes ingresar un correo electrónico válido
                  </Typography>
                )}
              </Box>
              <Button variant="contained" color="primary" /*onClick={handleNext}*/ type="submit" onClick={(e) => e.preventDefault}>
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
                  value={verificationCode}
                  {...register("email_code", {
                    required: true,
                    //solo debe admitir números
                    pattern: /^[0-9]*$/,
                    minLength: 6,
                  })}
                  onChange={handleInputsChange}
                />

                {errors.email_code && (
                  <Typography color="error" align="left" gutterBottom>
                    Solo se admiten números y debe tener 6 dígitos
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
                  {...register("nombres", {
                    required: true,
                    minLength: 2,
                  })
                  }
                  onChange={handleInputsChange}
                  fullWidth
                />
                {errors.nombres && (
                  <Typography
                    color="error"
                    align="left"
                    gutterBottom
                    {...register("nombres", {
                      required: true,
                      pattern: /^[a-zA-Z\s]*$/,
                    })
                    }
                  >
                    Debes ingresar tus dos nombres
                  </Typography>
                )}
              </Box>
              <Box>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  {...register("apellidos", {
                    required: true,
                    pattern: /^[a-zA-Z\s]*$/,
                  })
                  }
                />
                {errors.apellidos && (
                  <Typography color="error" align="left" gutterBottom>
                    Debes ingresar tus dos apellidos
                  </Typography>
                )}
              </Box>
              <Box>
                <TextField label="Password" variant="outlined" fullWidth />
                {errors.password && (
                  <Typography color="error" align="left" gutterBottom>
                    Debes ingresar una contraseña
                  </Typography>
                )
                }
              </Box>
              <Button variant="contained" color="primary" type="submit" onClick={(e) => {
                handleRegister
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
