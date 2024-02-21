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
import { LoginForm } from "../../../interfaces/Auth"

import useAuth from "../../../hooks/Auth/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loginCandidate } = useAuth();
  //const [dataForm, setDataForm] = useState<LoginForm>({} as LoginForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmitData: SubmitHandler<LoginForm> = (data) => {
    handleLogin(data);
  };

  const handleLogin = async (dataForm: LoginForm) => {
    const response = await loginCandidate(dataForm);
    console.log(response?.response)
    localStorage.setItem("userInfo", JSON.stringify(response?.response.data));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isCompany", "false");
    navigate("/");
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
            <Box>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                {...register("password", {
                  required: "Debes ingresar una contraseña",
                  minLength: {
                    value: 3,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })
                }
              />
              {errors.password && (
                <Typography variant="caption" color="error">
                  {errors.password.message}
                </Typography>
              )}
            </Box>
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
