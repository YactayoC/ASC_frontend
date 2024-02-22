import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  RadioGroup,
  Radio,
  IconButton,
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

      {/* Resultados */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "2rem",
          margin: "3rem auto 3rem auto",
          padding: "2rem 0",
          border: "1px solid #e0e0e0",
          backgroundColor: "#fff",
          width: "90%",
        }}
      >

        {/* Contenido */}
        <Grid container spacing={3}
        >
          {/* Contenido resultado busquedas */}
          <Grid
            item
            xs={4}
            lg={4}
            xl={4}
            xxl={4}
            xxxl={4}
            //RESPONSIVE
            sx={{
              maxHeight: "40rem",
              overflowY: "auto",
              borderRight: "1px solid #e0e0e0",
              [theme.breakpoints.down('llg')]: {
                display: "none",
              }
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
          <Grid
            item
            xs={6}
            smm={6}
            sm={6}
            mddd={6}
            mdd={6}
            llg={4}
            //RESPONSIVE
            sx={{
              maxHeight: "40rem",
              overflowY: "auto",
              borderRight: "1px solid #e0e0e0",
             
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "0.6rem",
                [theme.breakpoints.down('xxl')]: {
                  //paddingRight: "1rem",
                }
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
                  columnGap: "2.5rem",
                  [theme.breakpoints.down('xsl')]: {
                    flexDirection: "column",
                    rowGap: "0.6rem",
                  }
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
          <Grid
            item
            xs={6}
            smm={6}
            sm={6}
            mddd={6}
            mdd={6}
            llg={4}
            //RESPONSIVE
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
                  height: "100%",
                }}
              >
                <Box sx={{
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  [theme.breakpoints.down('lg')]: {
                    flexDirection: "column",
                    rowGap: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      width: "9rem",
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
                      width: "9rem",  
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
                    paddingTop: "1rem",
                    display: "flex",
                    columnGap: "1rem",
                    borderTop: "1px solid #e0e0e0",
                    justifyContent: "center",
                    [theme.breakpoints.down('lg')]: {
                      flexDirection: "column",
                      rowGap: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  }}
                >
                  <IconButton>
                    <PersonSearch
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                      }} />
                  </IconButton>
                  <IconButton>
                    <CreateOutlined
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                      }} />
                  </IconButton>
                  <IconButton>
                    <Print
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                      }} />
                  </IconButton>
                  <IconButton>
                    <ContentCopy
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                      }} />
                  </IconButton>
                  <IconButton>
                    <Delete
                      sx={{
                        color: "black",
                        fontSize: "2rem",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyAdsComp;
