import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  LinkedIn,
  ManageSearchOutlined,
  PostAddOutlined,
  Twitter,
} from "@mui/icons-material";

import ChatButton from "./components/common/Chat";
import SearchJob from "./components/common/SearchJob";
import theme from "../theme";

function App() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        height={isSmallScreen ? "80vh" : "68vh"}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundImage: `url('https://img.freepik.com/foto-gratis/colegas-sonrientes-tiro-medio-trabajo_23-2149308453.jpg?w=1380&t=st=1706459884~exp=1706460484~hmac=3b6927dc78c1a225e17290213c12e2d299b3e6c4822a59edcf9d34641a1e4b89')`,
          backgroundSize: "cover",
          backgroundPosition: "top bottom",
          position: "relative",
        }}
      >
        <Container>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              rowGap: "1rem",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "30px",
                right: "30px",
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  gap: "0.2rem",
                  alignItems: "center",
                }}
              >
                <PostAddOutlined
                  sx={{
                    fontSize: "2rem",
                  }}
                />
                Publicar aviso
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  gap: "0.2rem",
                  alignItems: "center",
                }}
              >
                <ManageSearchOutlined
                  sx={{
                    fontSize: "2rem",
                  }}
                />
                Postula aquí
              </Button>
            </Box>

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

      <Box
        sx={{
          position: "fixed",
          left: "0",
          top: "30%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton component="a" href="https://www.facebook.com">
          <Facebook
            sx={{
              fontSize: "2.5rem",
              color: "#0866ff",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        </IconButton>
        <IconButton component="a" href="https://www.linkedin.com">
          <LinkedIn
            sx={{
              fontSize: "2.5rem",
              color: "#0e76a8",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        </IconButton>
        <IconButton component="a" href="https://www.twitter.com">
          <Twitter
            sx={{
              fontSize: "2.5rem",
              color: "#00acee",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        </IconButton>
      </Box>

      <ChatButton />
    </>
  );
}

export default App;
