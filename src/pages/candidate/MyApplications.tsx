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
import { useEffect, useRef, useState } from "react";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import usePostulations from "../../hooks/Candidate/Postulations/usePostulations";

const MyApplications = () => {
  const [open, setOpen] = useState(false);
  const [allPostulations, setAllPostulations] = useState<any>([]);
  const { getPostulations } = usePostulations();
  const userInfo = localStorage.getItem("userInfo");
  const userInfoJson = JSON.parse(userInfo || "{}");
  const [filterPostulationStateId, setFilterPostulationStateId] = useState<{ [key: string]: number | null }>({
    id_estado_postulacion: null, // null indica sin filtro
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortedByDateDesc, setIsSortedByDateDesc] = useState(false); // Valor inicial correctamente establecido

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSortedByDateDesc(event.target.checked);
  };

  const getFilteredAndSortedPostulations = () => {
    const filteredPostulations = allPostulations.filter((postulation: any) => {
      return (
        Object.keys(filterPostulationStateId).every((key) => {
          const value = filterPostulationStateId[key];
          return value === null || postulation[key] === value;
        }) && postulation.puesto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Ordena las postulaciones por fecha
    return filteredPostulations.sort((a: any, b: any) => {
      const dateA = new Date(a.fecha_postulacion);
      const dateB = new Date(b.fecha_postulacion);
      return isSortedByDateDesc ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime(); // Orden descendente si `isSortedByDateDesc` es true, de lo contrario ascendente
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Función genérica para establecer un criterio de filtro
  const applyFilter = (criteria: { [key: string]: number | null }) => {
    setFilterPostulationStateId(criteria);
  };

  const postulationsToRender = getFilteredAndSortedPostulations();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleClose();
  };

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      // Tu lógica de carga aquí
      const handleGetPostulations = async () => {
        const postulations = await getPostulations(userInfoJson.id_user);
        setAllPostulations(postulations.response);
        console.log(postulations.response);
      };

      handleGetPostulations();
      mounted.current = true;
    }
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
              value={searchTerm} // Controla el valor del input con el estado
              onChange={handleSearchChange} // Actualiza el estado con cada cambio
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
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
                onClick={() => applyFilter({ id_estado_postulacion: null })}
              >
                Todos
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
                onClick={() => applyFilter({ id_estado_postulacion: 1 })}
              >
                Postulaciones
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
                onClick={() => applyFilter({ id_estado_postulacion: 2 })}
              >
                CV Leido
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
                onClick={() => applyFilter({ id_estado_postulacion: 3 })}
              >
                CV en proceso
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                }}
                onClick={() => applyFilter({ id_estado_postulacion: 4 })}
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
              <Switch
                checked={isSortedByDateDesc}
                onChange={handleSortChange}
                aria-label="switch-offert"
              />
            </Box>
          </Box>
          {postulationsToRender.map((postulation: any) => (
            <Box
              key={postulation.id}
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
                    {postulation.puesto}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {postulation.empresa} - {postulation.departamento}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Fecha postulacion: {(postulation.fecha_postulacion).substring(0, 10).split('-').reverse().join('-')}
                  </Typography>
                </Box>

                <Button variant="outlined"
                  onClick={handleOpen}>Actualiza tu proceso</Button>
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
