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
  Grid,
  Autocomplete,
  FormControl,
} from "@mui/material";
import {
  ArrowBack,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RegisterFormCompany } from "../../../interfaces/Auth";
import useAuth from "../../../hooks/Auth/useAuth";
import useVerificationEmail from "../../../hooks/Email/useVerificationEmail";

const RegisterComp = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { registerCompleteCompany } = useAuth();
  const { sendVerificationEmailCompany, verifyCodeEmailCompany } = useVerificationEmail();

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<RegisterFormCompany>();

  const onSubmitCompany: SubmitHandler<RegisterFormCompany> = (data) => {
    handleNext();
    console.log(data);

    if (tabValue === 0) {
      //enviar email_code y email
      handleSendVerificationEmail(data);
    }

    if (tabValue === 1) {
      handleVerifyCodeEmail(data);
    }

    if (tabValue === 2) {
      handleRegisterInfoCandidate(data);
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
        //   onClick={(e) => handleChange(e, i)}
        />
      );
    }

    return tabs;
  };

  const top100Films = [
    { label: "The Shawshank Redemption", id: 1 },
    { label: "The Godfather", id: 2 },
    { label: "The Godfather: Part II", id: 3 },
    { label: "The Dark Knight", id: 4 },
    { label: "12 Angry", id: 5 },
  ];

  const handleSendVerificationEmail = async (data: any) => {
    try {
      const response = await sendVerificationEmailCompany(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleVerifyCodeEmail = async (data: any) => {
    try {
      const response = await verifyCodeEmailCompany(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRegisterInfoCandidate = async (data: any) => {
    try {
      console.log(data)
      const response = await registerCompleteCompany(data);
      console.log(response)
      navigate("auth/company/register");
      //localStorage.setItem("userInfo", JSON.stringify(response?.response.data));
      localStorage.setItem("isCompany", "true");
      localStorage.setItem("isAuthenticated", "true");

    } catch (error) {
      console.log(error);
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
              onSubmit={handleSubmit(onSubmitCompany)}
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
                    required: "Debes ingresar un correo electrónico válido",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Formato de correo electrónico no válido"
                    },

                  })}
                />
                {errors.email && (
                  <Typography color="error" align="left" gutterBottom>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>
              <Button variant="contained" color="primary" type="submit" onClick={(e) => e.preventDefault}>
                Continuar
              </Button>
              <Link to="/auth/company/login">
                <Typography align="center" gutterBottom>
                  ¿Ya tienes una cuenta? Inicia sesión
                </Typography>
              </Link>
            </FormControl>
          )}
          {tabValue === 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmitCompany)}
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
            </Box>
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
              onSubmit={handleSubmit(onSubmitCompany)}
            >
              <Typography variant="h5" align="center" gutterBottom>
                Registra tus datos
              </Typography>
              <Typography align="center" gutterBottom>
                Asociaremos este nombre con
              </Typography>
              <Box>
                <TextField
                  label="Nombres y apellidos"
                  variant="outlined"
                  fullWidth
                  {...register("nombre_completo", {
                    required: "Debes ingresar tu nombre y apellido",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Solo se admiten letras"
                    }
                  })}
                />
                {errors.nombre_completo && (
                  <Typography color="error" align="left" gutterBottom>
                    {errors.nombre_completo.message}
                  </Typography>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box>
                    <TextField
                      label="Password"
                      variant="outlined"
                      autoComplete="onSubmit"
                      fullWidth
                      type="password"
                      {...register("password", {
                        required: "Debes ingresar una contraseña",
                        pattern: {
                          value: /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/,
                          message: "Debes ingresar una contraseña"
                        }
                      })}
                    />
                    {errors.password && (
                      <Typography color="error" align="left" gutterBottom>
                        {errors.password.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <TextField
                      label="Celular"
                      variant="outlined"
                      fullWidth
                      {...register("movil", {
                        required: "Debes ingresar tu número de celular",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Solo se admiten números"
                        }
                      })}
                    />
                    {errors.movil && (
                      <Typography color="error" align="left" gutterBottom>
                        {errors.movil.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <TextField
                      label="Nombre comercial"
                      variant="outlined"
                      fullWidth
                      {...register("nombre_comercial", {
                        required: "Debes ingresar el nombre comercial",
                        pattern: {
                          value: /^[A-Za-z0-9\s.,¡!¿?@€$%^&*()_\-=+]+$/,
                          message: "Solo se admiten letras"
                        }
                      })}
                    />
                    {errors.nombre_comercial && (
                      <Typography color="error" align="left" gutterBottom>
                        {errors.nombre_comercial.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <TextField
                      label="Razón social"
                      variant="outlined"
                      fullWidth
                      {...register("razon_social", {
                        required: "Debes ingresar la razón social",
                        pattern: {
                          value: /^[A-Za-z0-9\s.,¡!¿?@€$%^&*()_\-=+]+$/,
                          message: "Solo se admiten letras"
                        }
                      })}
                    />
                    {errors.razon_social && (
                      <Typography color="error" align="left" gutterBottom>
                        {errors.razon_social.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Controller
                      name="sector_id"
                      control={control}
                      rules={{ required: 'Este campo es requerido' }}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          id="combo-box-demo"
                          options={top100Films}
                          value={top100Films.find(option => option.id === field.value) || null}
                          sx={{ width: "fullWidth" }}
                          onChange={(_, data) => field.onChange(data ? data.id : '')}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Sector"
                              error={!!errors.sector_id}
                              helperText={errors.sector_id ? errors.sector_id.message : ''}
                            />
                          )}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción"
                      multiline
                      sx={{ width: "100%" }}
                      rows={4}
                      {...register("descripcion_empresa", {
                        required: "Debes ingresar una descripción",
                        pattern: {
                          value: /^[A-Za-z0-9\s.,¡!¿?@€$%^&*()_\-=+]+$/,
                          message: ""
                        }
                      })}
                    />
                    {errors.descripcion_empresa && (
                      <Typography color="error" align="left" gutterBottom>
                        {errors.descripcion_empresa.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" type="submit" onClick={(e) => e.preventDefault}>
                Continuar
              </Button>
            </FormControl>
          )}
        </Box>
      </Container>
    </>
  );
};

export default RegisterComp;
