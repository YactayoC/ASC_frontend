import HeaderButtons from "../../components/candidate/HeaderButtons";
import SearchJob from "../../components/common/SearchJob";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Switch,
} from "@mui/material";
import theme from "../../../theme";
import ButtonSocials from "../../components/common/ButtonSocials";
import { useState } from "react";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";

const MyApplications = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Agrega aquí la lógica para manejar el envío del formulario
    handleClose(); // Cierra el modal después de enviar el formulario
  };

  return (
    <>
      <HeaderButtons showLogo={true} />
      {/* Banner */}
      <HeaderMainPage />

      {/* Alertas */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5rem",
          marginBottom: "2rem",
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
          <SearchJob />
          <Typography
            variant="body1"
            textAlign="left"
            gutterBottom
            color="#a7a7a7"
          >
            Existen 1800 ofertas de empleo de 40 empresas
          </Typography>
        </Box>

        {/* Cuadro de alertas */}
        <Box
          sx={{
            boxShadow: 3,
            padding: "1rem",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "2rem",
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "1rem",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                marginBottom: "0",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.5rem",
                },
              }}
            >
              Mis postulaciones
            </Typography>
            <TextField
              label="Buscar puesto postulado"
              variant="outlined"
              margin="normal"
              type="text"
              sx={{
                width: "20rem",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                rowGap: "2rem",
                justifyContent: "center",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                columnGap: "1.7rem",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  rowGap: "2rem",
                },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
              >
                Todos
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
              >
                Postulaciones
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
              >
                CV Leido
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
              >
                CV en proceso
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
              >
                Proceso finalizado
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <Typography gutterBottom fontWeight={400}>
                Ordenar por fecha
              </Typography>
              <Switch aria-label="switch-offert" />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #a7a7a7",
              borderRadius: "10px",
              padding: "1rem",
              rowGap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                columnGap: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.8rem",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "1.2rem",
                    },
                  }}
                >
                  Puesto de interés
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Desarrollador Frontend - Lima
                </Typography>
              </Box>

              <Button variant="outlined">Actualiza tu proceso</Button>
            </Box>

          </Box>
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
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
            ¿Qué ofertas desea recibir?
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            <TextField
              label="Puesto"
              variant="outlined"
              margin="normal"
              type="text"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="select-ubicacion">Ubicacion</InputLabel>
              <Select
                labelId="select-ubicacion"
                id="demo-simple-select"
                value={10}
                label="Ubicacion"
              // onChange={handleChange}
              >
                <MenuItem value={10}>Lima</MenuItem>
                <MenuItem value={20}>Chilca</MenuItem>
                <MenuItem value={30}>Villa El Salvador</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="select-frecuencia">
                Frecuencia de notificaciones
              </InputLabel>
              <Select
                labelId="select-frecuencia"
                id="demo-simple-select"
                value={10}
                label="Frecuencia de notificaciones"
              // onChange={handleChange}
              >
                <MenuItem value={10}>Una vez cada 2 días</MenuItem>
                <MenuItem value={20}>Una vez cada 3 días</MenuItem>
                <MenuItem value={30}>Una vez a la semana</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Suscribirme
            </Button>
          </form>
        </Box>
      </Modal>

      <ButtonSocials />
    </>
  );
};

export default MyApplications;
