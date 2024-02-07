import { PostAddOutlined, ManageSearchOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

import theme from "../../../theme";
import { MouseEvent, useEffect, useState } from "react";

interface Props {
  showLogo?: boolean;
}

const HeaderButtons = ({ showLogo = false }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link: string) => {
    navigate(link);
    setAnchorEl(null);
  };

  const handleClickOutside = (event: any) => {
    if (anchorEl && !anchorEl.contains(event.target as Node)) {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [anchorEl]);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedIsAuthenticated === "true");
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return;
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: showLogo ? "space-between" : "flex-end",
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            marginTop: "0rem",
          },
        }}
      >
        {showLogo && (
          <Box
            sx={{
              marginLeft: "2rem",
              [theme.breakpoints.down("sm")]: {
                marginLeft: "0rem",
              },
            }}
            onClick={() => navigate("/")}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: "10rem",
                height: "auto",
                cursor: "pointer",
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "2rem",
            gap: "10px",
            width: "100%",
            marginBlock: "2rem",
            [theme.breakpoints.down("sm")]: {
              justifyContent: "center",
              paddingRight: "0",
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/candidate/my-applications")}
            sx={{
              display: "flex",
              columnGap: "0.2rem",
              alignItems: "center",
            }}
          >
            Mis postulaciones
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/candidate/alerts")}
            sx={{
              display: "flex",
              gap: "0.2rem",
              alignItems: "center",
            }}
          >
            Mis alertas
          </Button>
          <Avatar
            src="https://fotosprofesionales.es/wp-content/uploads/2023/08/fotografo-de-retrato-madrid-foto-corporativa-hombre-12.jpg"
            alt="avatar"
            sx={{
              width: "3rem",
              height: "3rem",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClickOutside}
            sx={{
              "& .MuiMenu-paper": {
                marginTop: "1rem",
              },

              "& .MuiList-root": {
                paddingBottom: "0 !important",
                paddingTop: "0",
              },
            }}
          >
            <Box
              onClick={handleClickOutside}
              sx={{
                backgroundColor: "primary.main",
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
                paddingBlock: "0.5rem",
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              Luis de Tomas
            </Box>
            <MenuItem onClick={() => handleClose("/candidate/my-account")}>
              Mi cuenta
            </MenuItem>
            <MenuItem onClick={() => handleClose("/candidate/my-cv")}>
              Mi CV
            </MenuItem>
            <MenuItem onClick={() => handleClose("/")}>Cerrar sesion</MenuItem>
          </Menu>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAuthenticated(!isAuthenticated);
          }}
          sx={{
            display: "flex",
            columnGap: "0.2rem",
            alignItems: "center",
          }}
        >
          {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "self-start",
        paddingRight: "2rem",
        gap: "10px",
        width: "100%",
        marginBlock: "2rem",
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
          paddingRight: "0",
        },
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
        onClick={() => navigate("/auth/candidate/register")}
        sx={{
          display: "flex",
          columnGap: "0.2rem",
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
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => {
          setIsAuthenticated(!isAuthenticated);
        }}
        sx={{
          display: "flex",
          columnGap: "0.2rem",
          alignItems: "center",
        }}
      >
        {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
      </Button>
    </Box>
  );
};

export default HeaderButtons;
