import {
  Box,
  Container,
  Link,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import theme from "../../theme";
import ChatButton from "../components/common/Chat";
import SearchJob from "../components/common/SearchJob";
import HeaderButtons from "../components/candidate/HeaderButtons";
import ButtonSocials from "../components/common/ButtonSocials";

import useDataDefault from "../hooks/useDataDefault";
import { useEffect } from "react";

function Home() {

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { getDataDefault } = useDataDefault();

  const handleData = async () => {
    const data = await getDataDefault();
    return data;
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Box
        height={isSmallScreen ? "85vh" : "68vh"}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        style={{
          backgroundImage: `url('/work.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          position: "relative",
        }}
      >
        <HeaderButtons />
        <Container>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              columnGap: "1rem",
              rowGap: "1rem",
              marginTop: "5rem",
              [theme.breakpoints.down("sm")]: {
                marginTop: "0",
              },
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              ¡Aquí encontraras el empleo que buscabas!
            </Typography>
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
        </Container>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "2rem",
          marginTop: "5rem",
        }}
      >
        <Container>
          <Typography
            variant="body1"
            textAlign="left"
            gutterBottom
            sx={{
              fontWeight: "700",
              fontSize: "1.5rem",
            }}
          >
            Áreas destacadas
          </Typography>
          <Box display="flex">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
            >
              <ListItem sx={{ width: "fit-content" }}>
                <Link href="/finanzas" color="inherit" underline="hover">
                  <ListItemText primary="Finanzas" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link href="/ventas" color="inherit" underline="hover">
                  <ListItemText primary="Ventas" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/atencion-al-cliente"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="Atención al cliente" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link href="/marketing" color="inherit" underline="hover">
                  <ListItemText primary="Marketing" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/informatica-y-computacion"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="Informatica y computación" />
                </Link>
              </ListItem>
            </Stack>
          </Box>
        </Container>
        <Container>
          <Typography
            variant="body1"
            textAlign="left"
            gutterBottom
            sx={{
              fontWeight: "700",
              fontSize: "1.5rem",
            }}
          >
            Enlaces de interés
          </Typography>
          <Box display="flex">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
            >
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/software-planillas"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="Software de planillas" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/como-podemos-ayudarte"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="¿Cómo podemos ayudarte?" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/empleos-destacados"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="Empleos destacados" />
                </Link>
              </ListItem>
            </Stack>
          </Box>
        </Container>
      </Box>

      <ButtonSocials />

      <ChatButton />
    </>
  );
}

export default Home;
