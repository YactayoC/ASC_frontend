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
  TextareaAutosize,
} from "@mui/material";

import theme from "../../../theme";
import HeaderButtons from "../../components/candidate/HeaderButtons";
import { useState } from "react";
import { EditOutlined } from "@mui/icons-material";

const MyAccount = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openModalEmail, setOpenModalEmail] = useState(false);

  const handleOpenModalEmail = () => {
    setOpenModalEmail(true);
  };

  const handleCloseModalEmail = () => {
    setOpenModalEmail(false);
  };

  const handleChange = (_e: any, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmitEmail = (event: any) => {
    event.preventDefault();
    // Agrega aquí la lógica para manejar el envío del formulario
    handleCloseModalEmail(); // Cierra el modal después de enviar el formulario
  };

  return (
    <>
      <HeaderButtons showLogo={true} />
      <Box
        // maxWidth=""
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
              Luis De Tomas, aquí podrás gestionar tu cuenta.
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
                    Luis De Tomas
                  </Typography>
                  <IconButton onClick={handleOpenModalEmail}>
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
                    luis_de_tomas@gmail.com
                  </Typography>
                  <IconButton onClick={handleOpenModalEmail}>
                    <EditOutlined />
                  </IconButton>
                </Box>

                <Typography variant="body1" color="#a7a7a7">
                  Miembro desde: 12/12/2021
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
            <Box
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
                  columnGap: "2rem",
                }}
              >
                <TextField
                  label="Nueva contraseña"
                  variant="outlined"
                  margin="normal"
                  type="password"
                />
                <TextField
                  label="Confirma nueva contraseña"
                  variant="outlined"
                  margin="normal"
                  type="password"
                />
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
                sx={{
                  width: "fit-content",
                  [theme.breakpoints.down("sm")]: {
                    width: "100%",
                  },
                }}
              >
                Guardar
              </Button>
            </Box>

            <Divider />

            <Box
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

              <Box>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Tu CV es visible en los avisos a los que te postulaste y en otras búsquedas que realizan las empresas."
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Tu CV es visible únicamente en los avisos a los que te postulaste"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "fit-content",
                  [theme.breakpoints.down("sm")]: {
                    width: "100%",
                  },
                }}
              >
                Guardar
              </Button>
            </Box>

            <Divider />

            <Box
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
                Eliminar mi cuenta
              </Typography>

              <Typography
                gutterBottom
                sx={{
                  fontSize: "1.2rem",
                }}
              >
                Si eliminas tu cuenta, no podrás postularte a más ofertas de
                trabajo ni revisar tus postulaciones
              </Typography>

              <Box>
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
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #a7a7a7",
                      resize: "none",
                      fontFamily: "roboto",
                    }}
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
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
            </Box>
          </Box>
        )}
      </Box>

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
          <form
            onSubmit={handleSubmitEmail}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
            }}
          >
            <TextField
              label="Email actual"
              variant="outlined"
              margin="normal"
              type="email"
              fullWidth
            />
            <TextField
              label="Email nuevo"
              variant="outlined"
              margin="normal"
              type="email"
              fullWidth
            />
            <TextField
              label="Repetir email nuevo"
              variant="outlined"
              margin="normal"
              type="email"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default MyAccount;
