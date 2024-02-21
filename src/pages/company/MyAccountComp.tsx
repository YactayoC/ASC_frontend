import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  TextareaAutosize,
  Autocomplete,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import theme from "../../../theme";
import HeaderButtons from "../../components/candidate/HeaderButtons";
import { useState } from "react";

const MyAccountComp = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

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

  const sectorCompany = [
    { label: "Tecnología", sector_id : 1 },
    { label: "Salud", sector_id : 2 },
    { label: "Educación", sector_id : 3 },
    { label: "Finanzas", sector_id : 4 },
    { label: "Comercio", sector_id : 5 },
    { label: "Turismo", sector_id : 6 },
    { label: "Industria", sector_id : 7 },
    { label: "Construcción", sector_id : 8 },
    { label: "Alimentación", sector_id : 9 },
    { label: "Transporte", sector_id : 10 },
    { label: "Servicios", sector_id : 11 },
    { label: "Otros", sector_id : 12 },
  ];

  const defaultSectorId = userInfo.sector_id;
  const defaultSector = sectorCompany.find(sector => sector.sector_id === defaultSectorId);

  return (
    <>
      <HeaderButtons showLogo={true} />
      <Box
        // maxWidth=""
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "3rem",
          rowGap: "2rem",
          border: "1px solid #a7a7a7",
          backgroundColor: "white",
          padding: "1rem",
          width: "100%",
          maxWidth: "95%",
          margin: "auto auto 2rem auto",
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
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: "2rem",
              columnGap: "2rem",
              width: "100%",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                gap: "1rem",
              },
              [theme.breakpoints.down("xll")]: {
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
              },
            }}
          >
            <Box
              sx={{
                [theme.breakpoints.down("xll")]: {
                  alignSelf: "center",
                },

              }}
            >
              <img
                src="https://fotosprofesionales.es/wp-content/uploads/2023/08/fotografo-de-retrato-madrid-foto-corporativa-hombre-12.jpg"
                alt="avatar"
                style={{
                  width: "20rem",
                  height: "20rem",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                rowGap: "1rem",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography variant="h4"
                sx={{
                  [theme.breakpoints.down("xll")]: {
                    marginTop: "1rem",
                  },
                  [theme.breakpoints.down("mdd")]: {
                    alignSelf: "center",
                  }
                }}
              >
                Datos del usuario
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "2rem",
                  width: "100%",

                  [theme.breakpoints.down("mdd")]: {
                    rowGap: "1rem",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    columnGap: "2rem",
                    [theme.breakpoints.down("mdd")]: {
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  }}
                >
                  <TextField
                    label="Razon social"
                    variant="outlined"
                    defaultValue={userInfo.razonsocial}
                    type="text"
                    fullWidth
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={sectorCompany}
                    defaultValue={defaultSector}
                    sx={{
                      width: "30rem",

                      [theme.breakpoints.down("mdd")]: {
                        width: "100%",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sector" />
                    )}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de fundación"
                      sx={{
                        width: "80%",
                        [theme.breakpoints.down("mdd")]: {
                          width: "100%",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "2rem",
                    [theme.breakpoints.down("mdd")]: {
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  }}
                >
                  <TextField
                    label="RUC"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    label="Web"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    label="Correo"
                    variant="outlined"
                    type="text"
                    fullWidth
                    defaultValue={userInfo.emailCompa}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "2rem",
                    [theme.breakpoints.down("mdd")]: {
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  }}
                >
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    label="Móvil"
                    variant="outlined"
                    type="text"
                    defaultValue={userInfo.movil}
                    fullWidth
                  />
                  <TextField
                    label="País"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "2rem",
                    width: "100%",
                    [theme.breakpoints.down("mdd")]: {
                      flexDirection: "column",
                      gap: "1rem",
                    },
                  }}
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={sectorCompany}
                    sx={{
                      width: "20rem",
                      [theme.breakpoints.down("mdd")]: {
                        width: "100%",
                      },
                    }}
                    
                    renderInput={(params) => (
                      <TextField {...params} label="Departamento" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={sectorCompany}
                    sx={{
                      width: "20rem",

                      [theme.breakpoints.down("mdd")]: {
                        width: "100%",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Provincia" />
                    )}
                  />
                  <TextField
                    label="Dirección"
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Descripción"
                  multiline
                  defaultValue={userInfo.descripcion_empresa}
                  fullWidth
                  rows={7}
                />
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
                  type="password"
                />
                <TextField
                  label="Confirma nueva contraseña"
                  variant="outlined"
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
              type="email"
              fullWidth
            />
            <TextField
              label="Email nuevo"
              variant="outlined"
              type="email"
              fullWidth
            />
            <TextField
              label="Repetir email nuevo"
              variant="outlined"
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

export default MyAccountComp;
