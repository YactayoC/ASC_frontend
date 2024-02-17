import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  Autocomplete,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";

import HeaderButtons from "../../components/candidate/HeaderButtons";
import theme from "../../../theme";
import SearchJob from "../../components/common/SearchJob";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { PersonSearch, CreateOutlined, Print, ContentCopy, Delete } from "@mui/icons-material";

const MyAdsComp = () => {

  console.log(location);

  const top100Films = [
    { label: 'Publicar' },
    { label: 'Pendiente publicar' },
    { label: 'Archivar' },
    { label: 'Borrar' },
  ]

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
              sm={3.6}
              sx={{
                maxHeight: "40rem",
                overflowY: "auto",
                borderRight: "1px solid #e0e0e0",
                [theme.breakpoints.down("lg")]: {
                  display: "none",
                  //width: "100%",
                },
              }}
            >
              <Box sx={{ borderBottom: 0.1, borderColor: 'divider', mb: 2 }}>
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
                        width: "80%",
                      }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </Box>
            </Grid>


            {/* Seleccionar detalle escritorio */}
            <Grid
              item
              xs={15}
              sm={8.35}
              sx={{
                display: "flex",
                marginTop: "1rem",
                width: "100%",
                [theme.breakpoints.down("lg")]: {
                  //display: "none",
                  width: "100%",
                  justifyContent: "center",
                },
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            >
              {/* Primera mitad */}
              <Grid item xs={12} sm={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "0.6rem",
                    //border: "1px solid #e0e0e0",
                    padding: "0 1rem 0 0",
                  }}
                >
                  <Typography sx={{
                    fontSize: "2rem",
                    fontWeight: "bold"
                  }}
                  >
                    Puesto de trabajo
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "2.5rem"
                    }}
                  >
                    <Typography sx={{
                      fontSize: "1.1rem",
                    }}
                    >
                      Creado por: XXXX
                    </Typography>
                    <Typography sx={{
                      fontSize: "1.1rem",
                    }}
                    >
                      Departamento: Lima
                    </Typography>
                  </Box>
                  <Typography sx={{
                    fontSize: "1.1rem",
                  }}
                  >
                    Fecha publicacion: 11/12/2022
                  </Typography>
                  <Typography sx={{
                    fontSize: "1.1rem",
                  }}
                  >
                    Fecha caducidad: 20/12/2022
                  </Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{
                      width: "60%",
                      marginTop: "2rem",
                    }}
                    renderInput={(params) => <TextField {...params} label="Acciones" />}
                  />
                  <Box
                    sx={{
                      marginTop: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "0.5rem",
                    }}
                  >
                    <Typography
                      fontWeight={600}
                    >Opciones adicionales</Typography>
                    <RadioGroup>
                      <FormControlLabel value="1" control={<Radio />} label="Marcar como destacado" />
                      <FormControlLabel value="2" control={<Radio />} label="Marcar como urgente" />
                    </RadioGroup>
                  </Box>
                </Box>
              </Grid>
              {/* Segunda mitad */}
              <Grid item xs={12} sm={8} sx={{
                borderLeft: "1px solid #e0e0e0",
              }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "0.8rem",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{
                    display: "flex",
                    columnGap: "3rem",
                    justifyContent: "center",
                    paddingBottom: "2rem",
                    width: "100%",
                    borderBottom: "1px solid #e0e0e0",
                  }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        width: "fit-content",
                        height: "6rem",
                        backgroundColor: "#1F96DF",
                        "&:hover": {
                          backgroundColor: "#1F96DF",
                        }
                      }}

                    >
                      50<br /> Inscritos
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        width: "fit-content",
                        height: "6rem",
                        backgroundColor: "#DFAE1F",
                        "&:hover": {
                          backgroundColor: "#DFAE1F",
                        }
                      }}
                    >
                      2<br /> Descartados
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      paddingTop: "2rem",
                      display: "flex",
                      columnGap: "1rem",
                      justifyContent: "space-around"
                    }}
                  >
                    <Button
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <PersonSearch
                        sx={{
                          color: "black",
                          fontSize: "2rem",
                        }} />
                    </Button>
                    <Button
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <CreateOutlined
                        sx={{
                          color: "black",
                          fontSize: "2rem",
                        }} />
                    </Button>
                    <Button
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <Print
                        sx={{
                          color: "black",
                          fontSize: "2rem",
                        }} />
                    </Button>
                    <Button
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <ContentCopy
                        sx={{
                          color: "black",
                          fontSize: "2rem",
                        }} />
                    </Button>
                    <Button
                      sx={{
                        width: "fit-content",
                      }}
                    >
                      <Delete
                        sx={{
                          color: "black",
                          fontSize: "2rem",
                        }}
                      />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MyAdsComp;
