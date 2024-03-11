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
import { useEffect, useState } from "react";
import useOffers from "../hooks/Candidate/Offers/useOffers";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Home() {
  const executed = useRef(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { getAreasTop } = useOffers();
  const [areasTop, setAreasTop] = useState<any>([]);
  const [countCompany, setCountCompany] = useState(null);
  const [countOffers, setCountOffers] = useState(null);

  const handleGetOffersByAreaTop = async (id: number) => {
    navigate(`/candidate/search/featured-area/${id}`);
  };

  const handleDataAreasTop = async () => {
    const data = await getAreasTop();
    setAreasTop(data.response.areas)
    setCountCompany(data.response.countCompanies)
    setCountOffers(data.response.countOffers)
    console.log(data.response)
  }

  useEffect(() => {
    if (!executed.current) {
      handleDataAreasTop();
      executed.current = true;
    }
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
          backgroundPosition: "center",
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
              Existen {Number(countOffers)} ofertas de empleo de {Number(countCompany)} empresas
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
          >
            {areasTop.map((area: any) => (
              <ListItem key={area.area_id} sx={{ width: "fit-content" }}>
                <Link onClick={() => handleGetOffersByAreaTop(area.area_id)} color="inherit" underline="hover">
                  <ListItemText >
                    {area.nombre} ({area.contador})
                  </ListItemText>
                </Link>
              </ListItem>
            ))}
          </Stack>
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
                  href="/link-interest-software"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="Software de planillas" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/link-interest-questions"
                  color="inherit"
                  underline="hover"
                >
                  <ListItemText primary="¿Cómo podemos ayudarte?" />
                </Link>
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <Link
                  href="/link-interest-jobs"
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
