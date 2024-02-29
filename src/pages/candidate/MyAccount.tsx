import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Modal,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";

import theme from "../../../theme";
import HeaderButtons from "../../components/candidate/HeaderButtons";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { EditOutlined } from "@mui/icons-material";

import useAccount from '../../hooks/Candidate/Account/useAccount';
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo as string) : null;
  const [tabValue, setTabValue] = useState(0);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
  const { updatePasswordCanddidate, changeVisibilityCV, deactivateAccount } = useAccount();
  const [activeForm, setActiveForm] = useState("");

  const convertBooleanToNumber = (value: boolean) => { return value ? 1 : 0; }

  const [cvVisible, setCvVisible] = useState(convertBooleanToNumber(user?.cv_visible));

  const onSubmitPassword = async (data: any) => {
    if (activeForm !== "password") return;
    if (!data.newPassword && !data.confirmNewPassword) {
      return;
    }
    const response = await updatePasswordCanddidate(user.id_user, data.newPassword);
    if (response.ok) {
      reset();
    }
  }

  const onSubmitVisibleCV = async (data: any) => {
    if (activeForm !== "privacy") return;
    if (convertBooleanToNumber(user?.cv_visible) !== Number(data.visibleCV)) {
      const response = await changeVisibilityCV(Number(data.visibleCV), user.id_user);
      if (response.ok) { // Asumiendo que response.ok indica éxito
        setCvVisible(Number(data.visibleCV));

        // Actualiza el estado local y el almacenamiento local con el nuevo valor
        const updatedUser = { ...user, cv_visible: data.visibleCV === "1" };
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      }
    } else if (convertBooleanToNumber(user?.cv_visible) === Number(data.visibleCV)) {
      // Si el valor no ha cambiado, simplemente retorna sin hacer nada
      console.log("No se realizó ningún cambio en la visibilidad del CV");
      return;
    }
  };

  const onSubmitDeactivateAccount = async (data: any) => {
    if (activeForm !== "deactivate") return;
    const response = await deactivateAccount(user.id_user, data.reason);
    if (response.ok) {
      navigate("/");
    }
  };

  const handleOpenModalEmail = () => {
    setOpenModalEmail(true);
  };

  const handleCloseModalEmail = () => {
    setOpenModalEmail(false);
  };

  const handleChange = (_e: any, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmitEmail = (data: any) => {
    // Aquí manejarías el envío de los datos del formulario, por ejemplo:
    // Si todo es correcto y no hay errores, cierra el modal
    if (!errors.newEmail && !errors.confirmEmail) {
      // handleCloseModalEmail();
      console.log(data);
      // Aquí harías la llamada a tu API para cambiar el correo electrónico
    }
  };

  const createdAt = userInfo ? JSON.parse(userInfo).created_at : "";
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('es-ES') : "";

  return (
    <>
      <HeaderButtons showLogo={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          marginBottom: "2rem",
          rowGap: "2rem",
          border: "1px solid #a7a7a7",
          backgroundColor: "white",
          padding: "1rem",
          width: "100%",
          maxWidth: "95%",
          margin: "auto",
        }}
      >
        <Typography variant="h4" textAlign="left" gutterBottom>
          Mi cuenta
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ width: "100%", borderBottom: "1px solid #a7a7a7" }}>
            <Tabs value={tabValue}>
              <Tab
                value={0}
                label="Información personal"
                onClick={(e) => handleChange(e, 0)}
              />
              <Tab
                value={1}
                label="Seguridad"
                onClick={(e) => handleChange(e, 1)}
              />
            </Tabs>
          </Box>
        </Box>

        {/* Cuadro segun tab */}
        {tabValue === 0 && (
          <Box
            sx={{
              //   boxShadow: 3,
              padding: "1rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "2rem",
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.2rem",
              }}
            >
              {userInfo ? JSON.parse(userInfo).nombresC : "Usuario empresarial"}, aquí podrás gestionar tu cuenta.
            </Typography>

            <Box
              display="flex"
              alignItems="start"
              gap={"2rem"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  gap: "1rem",
                },
              }}
            >
              <img
                src="https://fotosprofesionales.es/wp-content/uploads/2023/08/fotografo-de-retrato-madrid-foto-corporativa-hombre-12.jpg"
                alt="avatar"
                style={{
                  width: "8rem",
                  height: "10rem",
                  cursor: "pointer",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "0.5rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {userInfo ? JSON.parse(userInfo).nombresC : ""} {userInfo ? JSON.parse(userInfo).apellidosC : ""}
                  </Typography>
                  <IconButton onClick={() => {
                    navigate("/candidate/my-cv");
                  }}>
                    <EditOutlined />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "0.5rem",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    {userInfo ? JSON.parse(userInfo).emailCandidate : ""}
                  </Typography>
                  <IconButton onClick={handleOpenModalEmail}>
                    <EditOutlined />
                  </IconButton>
                </Box>

                <Typography variant="body1" color="#a7a7a7">
                  Miembro desde: {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box
            sx={{
              padding: "1rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "2rem",
            }}
          >
            <form onSubmit={handleSubmit(onSubmitPassword)}>
              <FormControl
                // component={"form"}
                //onSubmit={handleSubmit(onSubmitPassword)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  Cambiar contraseña
                </Typography>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "1.2rem",
                    color: "#a7a7a7",
                  }}
                >
                  Cambia tu contraseña para proteger tu cuenta.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "8rem",
                    [theme.breakpoints.down("md")]: {
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "1rem",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      label="Nueva contraseña"
                      variant="outlined"
                      type="password"
                      sx={{
                        width: "20rem",
                      }}
                      {...register("newPassword", {
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres" // Mensaje de error cuando no se cumple la condición
                        }
                      })}
                    />
                    {errors.newPassword &&
                      <Typography variant="caption" color="error">
                        {String(errors.newPassword.message)}
                      </Typography>
                    }
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      label="Confirma nueva contraseña"
                      variant="outlined"
                      sx={{
                        width: "20rem",
                      }}
                      type="password"
                      {...register("confirmNewPassword", {
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres"
                        },
                        validate: value =>
                          value === watch('newPassword') || "Las contraseñas no coinciden"
                      })}
                    />
                    {errors.confirmNewPassword &&
                      <Typography variant="caption" color="error">
                        {String(errors.confirmNewPassword.message)}
                      </Typography>
                    }
                  </Box>
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Solicita que todos los dispositivos inicien sesión con la nueva contraseña"
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => setActiveForm("password")}
                  sx={{
                    width: "fit-content",
                    [theme.breakpoints.down("sm")]: {
                      width: "100%",
                    },
                  }}
                >
                  Guardar
                </Button>
              </FormControl>
            </form>

            <Divider />

            <form onSubmit={handleSubmit(onSubmitVisibleCV)}>

              <FormControl
                //onSubmit={handleSubmit(onSubmitVisibleCV)}
                //component={"form"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  Privacidad
                </Typography>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={cvVisible.toString()}
                  name="radio-buttons-group"
                  onChange={(e) => setCvVisible(Number(e.target.value))}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Tu CV es visible en los avisos a los que te postulaste y en otras búsquedas que realizan las empresas."
                    {...register("visibleCV")}
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Tu CV es visible únicamente en los avisos a los que te postulaste"
                    {...register("visibleCV")}
                  />
                </RadioGroup>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveForm("privacy")}
                  sx={{
                    width: "fit-content",
                    [theme.breakpoints.down("sm")]: {
                      width: "100%",
                    },
                  }}
                >
                  Guardar
                </Button>
              </FormControl>
            </form>

            <Divider />

            <form onSubmit={handleSubmit(onSubmitDeactivateAccount)}>
              <FormControl
                //component={"form"}
                //onSubmit={handleSubmit(onSubmitDeactivateAccount)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "1.2rem",
                  }}
                >
                  ¿Por qué quieres eliminar tu cuenta?
                </Typography>
                <Box
                  width="60%"
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      width: "100%",
                    },
                  }}
                >
                  <TextField
                    label="Motivo"
                    variant="outlined"
                    fullWidth
                    defaultValue={"."}
                    multiline
                    minRows={3}
                    maxRows={5}
                    {...register("reason", {
                      required: "Por favor ingresa un motivo para eliminar tu cuenta"
                    })}
                  />
                  {errors.reason &&
                    <Typography variant="caption" color="error">
                      {String(errors.reason.message)}
                    </Typography>
                  }
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => setActiveForm("deactivate")}
                  color="primary"
                  sx={{
                    width: "fit-content",
                    [theme.breakpoints.down("sm")]: {
                      width: "100%",
                    },
                  }}
                >
                  Eliminar
                </Button>
              </FormControl>
            </form>

          </Box >
        )}
      </Box >

      <Modal
        open={openModalEmail}
        onClose={handleCloseModalEmail}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: "2rem",
            paddingBlock: "3rem",
          }}
        >
          <Typography variant="h6" id="modal-title" gutterBottom align="center">
            Modificar email
          </Typography>

          {/* CAMBIAR EL EMAIL - FALTA RUTA */}
          <FormControl
            component="form"
            onSubmit={handleSubmit(handleSubmitEmail)} // Utiliza el método handleSubmit de React Hook Form
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
            }}
          >
            <TextField
              {...register("emailActual", { required: true })} // Registra el campo con React Hook Form
              label="Email actual"
              variant="outlined"
              margin="normal"
              type="email"
              defaultValue={userInfo ? JSON.parse(userInfo).emailCandidate : ""}
              fullWidth
              //error={errors.emailActual} // Muestra un error si el campo es requerido y no se ha llenado'
              helperText={errors.emailNuevo && "Este campo es requerido"}
            />
            <Box>
              <TextField
                {...register("emailNuevo", { required: true })} // Registra este campo también
                label="Email nuevo"
                variant="outlined"
                margin="normal"
                fullWidth
              // error={errors.emailNuevo}
              //helperText={errors.emailNuevo && "Este campo es requerido"}
              />
              {errors.emailNuevo && <Typography variant="caption" color="error">{String(errors.emailNuevo.message)}</Typography>}
            </Box>
            <Box>
              <TextField
                {...register("repetirEmailNuevo", {
                  validate: value => value === watch('emailNuevo') || "Los emails no coinciden" // Valida que este campo coincida con emailNuevo
                })}
                label="Repetir email nuevo"
                variant="outlined"
                margin="normal"
                fullWidth
              //error={errors.repetirEmailNuevo}
              //helperText={errors.repetirEmailNuevo && errors.repetirEmailNuevo.message}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default MyAccount;
