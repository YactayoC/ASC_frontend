import { useParams } from "react-router-dom";
import {
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
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Select,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Facebook, Share, WhatsApp } from "@mui/icons-material";
import dayjs from "dayjs";

import HeaderButtons from "../../components/candidate/HeaderButtons";
import theme from "../../../theme";
import SearchJob from "../../components/common/SearchJob";
import { jobs } from "../../seed/resultsSearchJob";
import SwipperableDr from "../../components/common/SwipperableDr";

const ResultsSearch = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { value, location } = useParams();
  const [buttonOrderBy, setButtonOrderBy] = useState("recientes");
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  console.log(location);

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

  return (
    <>
      <HeaderButtons showLogo={true} />

      {/* Banner */}
      {/* <Box
        sx={{
          width: "100%",
          height: "100%",
          borderBlock: "2px solid #2b78e4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: "5rem",
          paddingBlock: "2rem",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            rowGap: "2rem",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box>
            <img
              src="/alert-1.png"
              alt="banner"
              style={{
                width: "10rem",
                height: "10rem",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color={"#2b78e4"}
            fontWeight={700}
          >
            Únete a nuestro equipo de trabajo
          </Typography>
          <Box>
            <img
              src="/alert-2.png"
              alt="banner"
              style={{
                width: "10rem",
                height: "10rem",
              }}
            />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom align="center" color={"#666666"}>
          ¡Aquí encontraras el empleo que buscabas!
        </Typography>
      </Box> */}

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
          Existen 1800 ofertas de empleo de 40 empresas
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
              <InputLabel id="select-modalidad-trabajo">
                Modalidad de trabajo
              </InputLabel>
              <Select
                labelId="select-modalidad-trabajo"
                id="demo-simple-select"
                value={10}
                label="Modalidad de trabajo"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Remoto</MenuItem>
                <MenuItem value={20}>Hibrido</MenuItem>
                <MenuItem value={30}>Presencial</MenuItem>
              </Select>
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
              <InputLabel id="select-modalidad-trabajo">
                Tipo de jornada
              </InputLabel>
              <Select
                labelId="select-modalidad-trabajo"
                id="demo-simple-select"
                value={10}
                label="Tipo de jornada"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Jornada Completa</MenuItem>
                <MenuItem value={20}>Part Time</MenuItem>
                <MenuItem value={30}>Rotativo</MenuItem>
              </Select>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha"
                  defaultValue={dayjs(new Date())}
                  format="DD/MM/YYYY"
                  sx={{
                    width: "100%",
                  }}
                />
              </LocalizationProvider>
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
              340 vacantes sobre <strong>{value}</strong>
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
                    key={prob.id}
                    sx={{
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <CardActionArea
                      onClick={() => {
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
                        <Typography variant="h6">{prob.jobTitle}</Typography>
                        <Link
                          href={prob.companyLink}
                          target="_blank"
                          sx={{
                            width: "fit-content",
                            fontSize: "1rem",
                          }}
                        >
                          {prob.companyName}
                        </Link>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                          }}
                        >
                          {prob.location}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                          }}
                        >
                          Modalidad de trabajo: {prob.workMode}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                          }}
                        >
                          Tipo de jornada: {prob.workType}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "#a7a7a7",
                          }}
                        >
                          Fecha: {prob.date}
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

            {/* Seleccionar detalle */}
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
                        Desarrollador Frontend
                      </Typography>
                      <Link
                        href="https://www.google.com"
                        target="_blank"
                        sx={{
                          width: "fit-content",
                          fontSize: "1rem",
                        }}
                      >
                        Google
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
                    Colombia, Bogotá
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
                    Somos una empresa con larga trayectoria en el mercado Retail
                    y manejo de tiendas en reconocidas marcas deportivas a nivel
                    internacional, tales como CAT, CONVERSE, FILA, MERRELL,
                    UMBRO Y COLISEUM, ofrecemos variedad de productos de calzado
                    y textil. Somos una empresa con larga trayectoria en el
                    mercado Retail y manejo de tiendas en reconocidas marcas
                    deportivas a nivel internacional, tales como CAT, CONVERSE,
                    FILA, MERRELL, UMBRO Y COLISEUM, ofrecemos variedad de
                    productos de calzado y manejo de tiendas en reconocidas
                    marcas deportivas a nivel internacional, tales como CAT,
                    CONVERSE, FILA, MERRELL, UMBRO Y COLISEUM, ofrecemos
                    variedad de productos de calzado y textil. Somos una empresa
                    con larga trayectoria en el mercado Retail y manejo de
                    tiendas en reconocidas marcas deportivas a nivel
                    internacional, tales como CAT, CONVERSE, FILA, MERRELL,
                    UMBRO Y COLISEUM, ofrecemos variedad de productos de calzado
                    y manejo de tiendas en reconocidas marcas deportivas a nivel
                    internacional, tales como CAT, CONVERSE, FILA, MERRELL,
                    UMBRO Y COLISEUM, ofrecemos variedad de productos de calzado
                    y textil. Somos una empresa con larga trayectoria en el
                    mercado Retail y manejo de tiendas en reconocidas marcas
                    deportivas a nivel internacional, tales como CAT, CONVERSE,
                    FILA, MERRELL, UMBRO Y COLISEUM, ofrecemos variedad de
                    productos de calzado y
                  </Typography>
                </Box>
              </SwipperableDr>
            )}

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
                    <Typography variant="h6">Desarrollador Frontend</Typography>
                    <Link
                      href="https://www.google.com"
                      target="_blank"
                      sx={{
                        width: "fit-content",
                        fontSize: "1rem",
                      }}
                    >
                      Google
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
                  Colombia, Bogotá
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
                  Somos una empresa con larga trayectoria en el mercado Retail y
                  manejo de tiendas en reconocidas marcas deportivas a nivel
                  internacional, tales como CAT, CONVERSE, FILA, MERRELL, UMBRO
                  Y COLISEUM, ofrecemos variedad de productos de calzado y
                  textil.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ResultsSearch;
