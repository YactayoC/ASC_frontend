import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";

import HeaderButtons from "../../components/candidate/HeaderButtons";
import theme from "../../../theme";
import SearchJob from "../../components/common/SearchJob";
import { useState } from "react";

const ResultsSearch = () => {
  const { value } = useParams();
  const [buttonOrderBy, setButtonOrderBy] = useState<string>("");

  return (
    <>
      <HeaderButtons isAuthenticated={true} showLogo={true} />

      {/* Banner */}
      <Box
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
      </Box>

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
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-modalidad-trabajo">Fecha</InputLabel>
              <Select
                labelId="select-modalidad-trabajo"
                id="demo-simple-select"
                value={10}
                label="Modalidad de trabajo"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Soltero</MenuItem>
                <MenuItem value={20}>Viudo</MenuItem>
                <MenuItem value={30}>Casado</MenuItem>
              </Select>
            </FormControl>
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
            marginTop: "5rem",
            border: "1px solid #e0e0e0",
            width: "90%",
            padding: "2rem",
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
            <Typography gutterBottom fontWeight={400}>
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
        </Box>
      </Container>
    </>
  );
};

export default ResultsSearch;
