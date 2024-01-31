import HeaderButtons from "../auth/candidate/HeaderButtons";
import SearchJob from "../../components/common/SearchJob";
import { Box, Button, Container, Typography } from "@mui/material";
import theme from "../../../theme";

const Alerts = () => {
  return (
    <>
      <HeaderButtons isAuthenticated={true} showLogo={true} />
      <Container maxWidth="xl">
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
          }}
        >
          <Typography variant="h4" gutterBottom>
            Mis alertas
          </Typography>
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
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Frecuencia de envío
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Una vez al día
                </Typography>
              </Box>

              <Button variant="outlined">Editar</Button>
            </Box>

            <Button
              variant="outlined"
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
        </Box>
      </Container>
    </>
  );
};

export default Alerts;
