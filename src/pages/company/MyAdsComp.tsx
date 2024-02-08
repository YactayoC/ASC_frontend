import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Facebook, Share, WhatsApp } from "@mui/icons-material";

import HeaderButtons from "../../components/candidate/HeaderButtons";
import theme from "../../../theme";
import SearchJob from "../../components/common/SearchJob";
import SwipperableDr from "../../components/common/SwipperableDr";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MyAdsComp = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(location);

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
      <HeaderMainPage />

      <Container
        maxWidth="lg"
        sx={{
          marginTop: "5rem",
        }}
      >
        <SearchJob />
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5rem",
        }}
      >
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

          {/* Contenido */}
          <Grid container spacing={3}>
            {/* Contenido resultado busquedas */}
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                maxHeight: "40rem",
                overflowY: "auto",
              }}
            >
              <Box sx={{ borderBottom: 0.1, borderColor: 'divider', mb: 3 }}>
                <Typography variant="h6" component="div" sx={{
                  color: "#313944",
                }}>
                  Filtros
                </Typography>
              </Box>

              <Box sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
              }}>
                <Box>
                  <Typography variant="h6" component="div" sx={{
                    color: "#313944",
                  }}>
                    Estado del aviso
                  </Typography>

                  <FormGroup sx={{
                    marginLeft: "1rem",
                  }}>
                    <FormControlLabel control={<Checkbox />} label="Pendiente" />
                    <FormControlLabel control={<Checkbox />} label="Activo" />
                    <FormControlLabel control={<Checkbox />} label="Archivado" />
                  </FormGroup>
                </Box>
                <Box>
                  <Typography variant="h6" component="div" sx={{
                    color: "#313944",
                  }}>
                    Administrador
                  </Typography>

                  <FormGroup sx={{
                    marginLeft: "1rem",
                  }}>
                    <FormControlLabel control={<Checkbox />} label="AAAAAAA" />
                    <FormControlLabel control={<Checkbox />} label="BBBBBBB" />
                    <FormControlLabel control={<Checkbox />} label="CCCCCCC" />
                  </FormGroup>
                </Box>
                <Box>
                  <Typography variant="h6" component="div" sx={{
                    color: "#313944",
                  }}>
                    Fecha de publicación
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="" sx={{
                        width: "70%",
                      }} />
                    </DemoContainer>
                  </LocalizationProvider>
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
            {/* Seleccionar detalle escritorio */}
            <Grid
              item
              xs={12}
              sm={8}
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

export default MyAdsComp;
