import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
  FormControl,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import theme from "../../../../theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../../../interfaces/Auth";
import useAuth from "../../../hooks/Auth/useAuth";

const LoginComp = () => {
  //const [dataForm, setDataForm] = useState<LoginForm>({} as LoginForm);
  const navigate = useNavigate();
  const { loginCompany } = useAuth();

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
      const response = await loginCompany(dataForm);
      console.log(response?.response)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isCompany", "true");
      navigate("/company/my-ads");
    }
    catch (error: any) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Correo o contraseña incorrectos";
      setError("email", {
        type: "manual",
        message: errorMessage,
      });
    }
  }

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
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Email inválido",
                  },
                })
                }
              />
              {errors.email && (
                <Typography variant="caption" color="red">
                  {errors.email.message}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="h5" align="left" gutterBottom>
              Ingresa tu contraseña
            </Typography>
            <Box>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 1,
                    message: "La contraseña debe tener al menos 1 caracteres",
                  },
                })
                }
              />
              {errors.password && (
                <Typography variant="caption" color="red">
                  {errors.password.message}
                </Typography>
              )}
            </Box>
          </Box>

          <Button variant="contained" color="primary" type="submit" onClick={(e) => {
            e.preventDefault
          }}>
            Continuar
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default LoginComp;
