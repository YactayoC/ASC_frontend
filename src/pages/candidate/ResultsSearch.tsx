import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Facebook, Share, WhatsApp } from "@mui/icons-material";
import dayjs from "dayjs";
import HeaderButtons from "../../components/candidate/HeaderButtons";
import theme from "../../../theme";
import SearchJob from "../../components/common/SearchJob";
import { jobs } from "../../seed/resultsSearchJob";
import SwipperableDr from "../../components/common/SwipperableDr";
import { Jornada, ModalidadTrabajo } from "../../interfaces/Jobs";
import { useNavigate } from "react-router-dom";
import useOffers from "../../hooks/Candidate/Offers/useOffers";

const ResultsSearch = () => {
  const navigate = useNavigate();
  const [postulatedJobIds, setPostulatedJobIds] = useState<number[]>([]);
  const [openConfirmationPost, setOpenConfirmationPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { value, location, featuredArea } = useParams<{ value: string; location?: string; featuredArea?: string }>();
  const [searchParamsString, setSearchParamsString] = useState('');
  const isFirstRun = useRef(true);
  const [buttonOrderBy, setButtonOrderBy] = useState("recientes");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState<any>(jobs.length > 0 ? jobs[0] : undefined);
  const [selectModalidad, setSelectModalidad] = useState<number | null>(null);
  const [selectJornada, setSelectJornada] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const { getOffersByProvinceId, getOffersByJobAndProvinceId, getOffersByJob } = useOffers();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerPage = 5;

  const handleModalidadChange = (_event: any, newValue: ModalidadTrabajo | null) => {
    setSelectModalidad(newValue ? newValue.id : null);
  };

  const handleJornadaChange = (_event: any, newValue: Jornada | null) => {
    setSelectJornada(newValue ? newValue.id : null);
  };

  const filteredJobs = jobs.filter((job) => {

    const locationMatchId = location ? job.empresa.provincia.id === parseInt(location) : true;
    const matchesArea = featuredArea ? job.area.id === parseInt(featuredArea) : true;


    return (
      locationMatchId &&
      matchesArea &&
      (!selectModalidad || job.modalidad_trabajo_id.id === selectModalidad) &&
      (!selectJornada || job.jornada_id.id === selectJornada) &&
      (job.nombre_puesto.toLowerCase().includes((value ?? '').toLowerCase()) ||
        job.empresa.nombre_completo.toLowerCase().includes((value ?? '').toLowerCase())) &&
      (selectedDate === dayjs(job.fecha_creacion).toISOString().split('T')[0])
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShareFacebook = () => {
    const facebookShareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=pe.computrabajo.com/trabajo-de-desarrollador-en-lima#D5C37727DA72857061373E686DCF3405";
    window.open(facebookShareUrl, "_blank");
    handleClose();
  };

  const handleShareInstagram = () => {
    handleClose();
  };

  const handleDateChange = (newValue: any) => {
    // Convierte el timestamp (newValue) a un string legible usando dayjs
    //const dateStringFormat = dayjs(newValue).format("DD-MM-YYYY");
    const dateStringNoFormat = dayjs(newValue).format("YYYY-MM-DD");
    //console.log(dateStringNoFormat); // Imprime la fecha en formato 'YYYY-MM-DD'
    //console.log(dateStringFormat)
    setSelectedDate(dateStringNoFormat);
  }

  const modalidad_trabajo: ModalidadTrabajo[] = [
    { id: 1, nombre: "Presencial" },
    { id: 2, nombre: "Remoto" },
    { id: 3, nombre: "Híbrido" },
  ];

  const tipo_jornada: Jornada[] = [
    { id: 1, nombre: "A Tiempo completo" },
    { id: 2, nombre: "A Tiempo parcial" },
    { id: 3, nombre: "Por horas" },
    { id: 4, nombre: "Beca/Prácticas" },
  ];

  const applyOffer = (jobId: number) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "false" || isAuthenticated === null) {
      navigate("/login");
    } else {
      setPostulatedJobIds(prevIds => {
        const newIds = [...new Set([...prevIds, jobId])];
        localStorage.setItem('postulatedJobIds', JSON.stringify(newIds));
        return newIds;
      });
      setOpenConfirmationPost(true);
    }
  };

  useEffect(() => {
    const storedPostulatedJobIds = localStorage.getItem('postulatedJobIds');
    if (storedPostulatedJobIds) {
      setPostulatedJobIds(JSON.parse(storedPostulatedJobIds));
    }
  }, []);

  useEffect(() => {
    // Verifica si el trabajo seleccionado actualmente sigue estando en los trabajos filtrados
    const isSelectedJobStillValid = filteredJobs.find(job => job.oferta_id === selectedJob?.oferta_id);

    if (!isSelectedJobStillValid && filteredJobs.length > 0) {
      // Si el trabajo seleccionado ya no es válido y hay trabajos filtrados, selecciona el primero
      setSelectedJob(filteredJobs[0]);
    } else if (!isSelectedJobStillValid && filteredJobs.length === 0) {
      // Si no hay trabajos filtrados, resetea el trabajo seleccionado a undefined
      setSelectedJob(undefined);
    }
    // No cambies el trabajo seleccionado si sigue siendo válido
  }, [filteredJobs]);

  useEffect(() => {
    // Crea una cadena que representa los parámetros actuales de búsqueda
    const currentParamsString = `${value}-${location ?? 'all'}-${featuredArea ?? 'all'}`;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (currentParamsString === searchParamsString) {
      console.log("Los parámetros de búsqueda no han cambiado. Evitando nueva petición.");
      return;
    }

    const fetchData = async () => {
      let response;

      if (location && value) {
        response = await getOffersByJobAndProvinceId(value, parseInt(location));
      } else if (location) {
        response = await getOffersByProvinceId(parseInt(location));
      } else if (value) {
        response = await getOffersByJob(value);
      } else {
        return;
      }
      setSearchParamsString(currentParamsString);

      console.log(response);
    };

    fetchData();
    setSearchParamsString(currentParamsString);
  }, [value, location, featuredArea, searchParamsString]);

  return (
    <>
      <HeaderButtons showLogo={true} />

      <Container
        maxWidth="lg"
        sx={{
          marginTop: "5rem",
        }}
      >
        <SearchJob />
        <Typography
          variant="body1"
          textAlign="left"
          gutterBottom
          color="#a7a7a7"
        >
          Existen {filteredJobs.length} ofertas de empleo de 40 empresas
        </Typography>
      </Container>
      <Container
        maxWidth="xxl"
        sx={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5rem",
        }}
      >
        {/* Filtros */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
            width: "90%",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              rowGap: "2rem",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              columnGap: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                //disableClearable
                id="combo-box-demo"
                options={modalidad_trabajo}
                onChange={handleModalidadChange}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} label="Modalidad de trabajo" />
                )}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              columnGap: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <FormControl fullWidth>

              <Autocomplete
                disablePortal
                //disableClearable
                id="combo-box-demo"
                onChange={handleJornadaChange}
                options={tipo_jornada}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de jornada" />
                )}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              columnGap: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                onChange={handleDateChange}
                defaultValue={dayjs(new Date())}
                format="DD/MM/YYYY"
                maxDate={dayjs(new Date())}
                minDate={dayjs("1900")}
                sx={{
                  width: "100%",
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {/* Resultados */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "2rem",
            marginTop: "2rem",
            border: "1px solid #e0e0e0",
            backgroundColor: "#fff",
            width: "90%",
            padding: "2rem",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          }}
        >
          {/* EN CASO NO HAYA OFERTAS */}
          {filteredJobs.length === 0 ? (
            <>
              <Typography gutterBottom fontWeight={400}>
                No se encontraron ofertas de empleo
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    rowGap: "2rem",
                  },
                }}
              >
                <Typography
                  gutterBottom
                  fontWeight={400}
                  sx={{
                    maxWidth: "25rem",
                  }}
                >
                  {filteredJobs.length} {filteredJobs.length === 1 ? "vacante" : "vacantes"} sobre <strong>{value}</strong>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <Typography gutterBottom fontWeight={400}>
                    Recibe ofertas de empleo
                  </Typography>
                  <Switch aria-label="switch-offert" />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    columnGap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom fontWeight={400}>
                    Ordenar por:
                  </Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button
                      onClick={() => setButtonOrderBy("recientes")}
                      variant={
                        buttonOrderBy === "recientes" ? "contained" : "outlined"
                      }
                    >
                      Recientes
                    </Button>
                    <Button
                      onClick={() => setButtonOrderBy("antiguos")}
                      variant={
                        buttonOrderBy === "antiguos" ? "contained" : "outlined"
                      }
                    >
                      Antiguos
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>

              {/* Contenido */}
              <Grid container spacing={2}>
                {/* Contenido resultado busquedas */}
                <Grid
                  item
                  xs={12}
                  sm={5}
                  sx={{
                    maxHeight: "40rem",
                    overflowY: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "1rem",
                      paddingRight: "1rem",
                      paddingBottom: "1rem",
                    }}
                  >
                    {currentJobs.slice(0, 5).map((prob) => (
                      <Card
                        key={prob.oferta_id}
                        sx={{
                          //border: "1px solid #e0e0e0",
                          border: selectedJob?.oferta_id === prob.oferta_id ? "1px solid #0d3878" : "1px solid #e0e0e0",
                          boxShadow: selectedJob?.oferta_id === prob.oferta_id ? "0px 0px 4px #0d3878" : "",
                          transition: "border-color 0.3s ease",
                        }}
                      >
                        <CardActionArea
                          onClick={() => {
                            setSelectedJob(prob);
                            if (isSmallScreen) {
                              setOpen(true);
                            }
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: "0.5rem",
                            }}
                          >
                            <Typography variant="h6">{prob.nombre_puesto}</Typography>
                            <Link
                              href={prob.empresa?.sitio_web}
                              target="_blank"
                              sx={{
                                width: "fit-content",
                                fontSize: "1rem",
                              }}
                            >
                              {prob.empresa?.nombre_completo}
                            </Link>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                              }}
                            >
                              {prob.empresa?.direccion}, {prob.empresa?.provincia?.nombre_provincia}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                              }}
                            >
                              Modalidad de trabajo: {prob.modalidad_trabajo_id?.nombre}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                              }}
                            >
                              Tipo de jornada: {prob.jornada_id?.nombre}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.8rem",
                                color: "#a7a7a7",
                              }}
                            >
                              Fecha: {dayjs(prob.fecha_publicacion_automatica).format("DD-MM-YYYY")}
                              {/* Fecha: {prob.fecha_publicacion_automatica} */}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: "1rem",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={currentPage === 1}
                        size="large"
                        onClick={handlePrevPage}
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                        }}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={currentPage === totalPages}
                        size="large"
                        onClick={handleNextPage}
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                        }}
                      >
                        Siguiente
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                {/* Seleccionar detalle movil */}
                {isSmallScreen && (
                  <SwipperableDr open={open} setOpen={setOpen}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        border: "1px solid #e0e0e0",
                        height: "100%",
                        maxHeight: "48rem",
                        overflowY: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          columnGap: "1rem",
                          height: "100%",
                        }}
                      >
                        <Box>
                          <Typography variant="h6">
                            {selectedJob?.nombre_puesto}
                          </Typography>
                          <Link
                            href={selectedJob?.empresa?.sitio_web}
                            target="_blank"
                            sx={{
                              width: "fit-content",
                              fontSize: "1rem",
                            }}
                          >
                            {selectedJob?.empresa?.nombre_completo}
                          </Link>
                        </Box>
                        <img
                          src="
                    https://cdn.pixabay.com/photo/2021/08/10/15/36/microsoft-6536268_1280.png"
                          alt=""
                          style={{
                            width: "3rem",
                            height: "3rem",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "1rem",
                        }}
                      >
                        {selectedJob?.empresa?.direccion}
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "1rem",
                          display: "flex",
                          columnGap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          sx={{
                            width: "fit-content",
                            borderRadius: "20px",
                          }}
                        >
                          Postularme
                        </Button>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          onClick={(e: any) => setAnchorEl(e.currentTarget)}
                        >
                          <Share />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem
                            onClick={handleShareFacebook}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "0.5rem",
                            }}
                          >
                            <Facebook />
                            <Typography
                              component={"span"}
                              sx={{
                                fontSize: "0.9rem",
                              }}
                            >
                              Facebook
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={handleShareInstagram}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "0.5rem",
                            }}
                          >
                            <WhatsApp />
                            <Typography
                              component={"span"}
                              sx={{
                                fontSize: "0.9rem",
                              }}
                            >
                              Whatsapp
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                      <Divider sx={{ marginTop: "1rem" }} />
                      <Typography
                        sx={{
                          marginTop: "1rem",
                          fontWeight: 400,
                          color: "##313944",
                        }}
                      >
                        {selectedJob?.descripcion}
                      </Typography>
                    </Box>
                  </SwipperableDr>
                )}
                {/* Seleccionar detalle escritorio */}
                <Grid
                  item
                  xs={12}
                  sm={7}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      display: "none",
                    },
                  }}
                >
                  {selectedJob && (
                    <>
                      {openConfirmationPost && postulatedJobIds.includes(selectedJob.oferta_id) ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            border: "1px solid #e0e0e0",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",

                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            ¡Felicitaciones! Te has postulado a la oferta de empleo
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            En breve estarías recibiendo una respuesta de la empresa
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              padding: "1rem",
                              border: "1px solid #e0e0e0",
                              height: "100%",
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
                              <Box>
                                <Typography variant="h6">{selectedJob.nombre_puesto}</Typography>
                                <Link
                                  href={selectedJob.empresa?.sitio_web}
                                  target="_blank"
                                  sx={{
                                    width: "fit-content",
                                    fontSize: "1rem",
                                  }}
                                >
                                  {selectedJob.empresa?.nombre_completo}
                                </Link>
                              </Box>
                              <img
                                src="
                    https://cdn.pixabay.com/photo/2021/08/10/15/36/microsoft-6536268_1280.png"
                                alt=""
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                }}
                              />
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                              }}
                            >
                              {selectedJob.empresa?.direccion}, {selectedJob.empresa?.provincia?.nombre_provincia}
                            </Typography>
                            <Box
                              sx={{
                                marginTop: "1rem",
                                display: "flex",
                                columnGap: "1rem",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                  width: "fit-content",
                                  borderRadius: "20px",
                                }}
                                onClick={() => applyOffer(selectedJob.oferta_id)}
                              >
                                Postularme
                              </Button>
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                onClick={(e: any) => setAnchorEl(e.currentTarget)}
                              >
                                <Share />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem
                                  onClick={handleShareFacebook}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    columnGap: "0.5rem",
                                  }}
                                >
                                  <Facebook />
                                  <Typography
                                    component={"span"}
                                    sx={{
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    Facebook
                                  </Typography>
                                </MenuItem>
                                <MenuItem
                                  onClick={handleShareInstagram}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    columnGap: "0.5rem",
                                  }}
                                >
                                  <WhatsApp />
                                  <Typography
                                    component={"span"}
                                    sx={{
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    Whatsapp
                                  </Typography>
                                </MenuItem>
                              </Menu>
                            </Box>
                            <Divider sx={{ marginTop: "1rem" }} />
                            <Typography
                              sx={{
                                marginTop: "1rem",
                                fontWeight: 400,
                                color: "##313944",
                              }}
                            >
                              {selectedJob.descripcion}
                            </Typography>
                          </Box>
                        </>
                      )}

                    </>

                  )}


                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ResultsSearch;
