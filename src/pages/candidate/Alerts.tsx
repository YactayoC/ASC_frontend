import HeaderButtons from "../../components/candidate/HeaderButtons";
import SearchJob from "../../components/common/SearchJob";
import {
  Autocomplete,
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
} from "@mui/material";
import theme from "../../../theme";
import ButtonSocials from "../../components/common/ButtonSocials";
import { useEffect, useState } from "react";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import useAlerts from "../../hooks/Candidate/Alerts/useAlerts";
import { seedLocations } from "../../seed/locations";

const Alerts = () => {
  const [open, setOpen] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo) : null;
  const [locationLabel, setLocationLabel] = useState(""); // Para la etiqueta de visualización
  const [alerts, setAlerts] = useState<any>([]); // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
  const { getAlerts, createAlert, updateAlert } = useAlerts();
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

  const flatOptions = seedLocations.flatMap(departamento =>
    departamento.provincias.map(provincia => ({
      provincia_id: provincia.provincia_id,
      label: `${departamento.nombre_departamento} - ${provincia.nombre_provincia}`,
      nombre_provincia: provincia.nombre_provincia,
      nombre_departamento: departamento.nombre_departamento,
    }))
  );


  useEffect(() => {
    const handleDataAlerts = async () => {
      const response = await getAlerts(
        user?.id_user,
      );
      setAlerts(response.response);
      console.log(response.response);
    };

    handleDataAlerts();
  }, []);

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
            backgroundColor: "white",
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
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.5rem",
                },
              }}
            >
              Mis alertas
            </Typography>
            <Button
              variant="outlined"
              onClick={handleOpen}
              sx={{
                width: "fit-content",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
              }}
            >
              Agregar alerta
            </Button>
          </Box>

          {alerts.map((alert: any) => (
            <Box
              key={alert.id}
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
                    Frecuencia de envío
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {alert.frecuencia}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Puesto: {alert.puesto_interes}
                  </Typography>
                </Box>

                <Button variant="outlined">Editar</Button>
              </Box>
            </Box>
          ))}
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
            {/* PENDIENTE DE REVISAR */}
            {/* <Autocomplete
              id="grouped-demo"
              fullWidth
              options={flatOptions}
              value={flatOptions.find(option => option.label === locationLabel) || null}
              groupBy={(option) => option.nombre_departamento}
              getOptionLabel={(option) => option.label}
              onChange={(_event, newValue) => {
                // Obtiene el ID y el label de la nueva ubicación seleccionada
                const newLocationValue = newValue ? String(newValue.provincia_id) : '';
                const newLocationLabel = newValue ? newValue.label : '';

                // Actualiza el estado y localStorage con los nuevos valores
                setLocation(newLocationValue);
                setLocationLabel(newLocationLabel); // Esto garantiza que el label se actualice para mostrar el valor correcto

              }}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Ubicación"
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    width: "100%",
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              }
              renderOption={(props, option) => (
                <li {...props}>
                  {option.nombre_provincia}
                </li>
              )}
            /> */}
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

export default Alerts;
