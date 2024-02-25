import { PostAddOutlined, ManageSearchOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

import theme from "../../../theme";
import { MouseEvent, useEffect, useState } from "react";

import { useAtom } from "jotai";
import { userAtomCompany, userAtomPostulant } from "../../store/user";
import { atomSearch } from "../../store/atomSearch";

interface Props {
  showLogo?: boolean;
}

const HeaderButtons = ({ showLogo = false }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [verifyCompany, setVerifyCompany] = useState<boolean>(false);
  const [, setValueAtomSearch] = useAtom(atomSearch);
  const [userP] = useAtom(userAtomPostulant);
  const [userC] = useAtom(userAtomCompany);

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
    const storedIsCompany = localStorage.getItem("isCompany");
    setVerifyCompany(storedIsCompany === "true");
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
            onClick={() => {
              navigate("/");
              localStorage.removeItem("searchValue")
              setValueAtomSearch({ value: "", location: "" })
            }}
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

        {verifyCompany ? (
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
              onClick={() => navigate("/company/post-my-ad")}
              sx={{
                display: "flex",
                columnGap: "0.2rem",
                alignItems: "center",
              }}
            >
              Publicar anuncio
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/company/my-ads")}
              sx={{
                display: "flex",
                gap: "0.2rem",
                alignItems: "center",
              }}
            >
              Mis avisos
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
                width: "100%",
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
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                  paddingBlock: "0.5rem",
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                {userC?.nombre_Company}
              </Box>
              <MenuItem onClick={() => handleClose("/company/my-account")}>
                Editar perfil
              </MenuItem>
              <MenuItem onClick={() => handleClose("/candidate/my-cv")}>
                Notificaciones
              </MenuItem>
              <MenuItem onClick={() => {
                localStorage.removeItem("isCompany");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("userInfo");
                setIsAuthenticated(!isAuthenticated);
                handleClose("/")
              }}>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        ) : (
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
                  width: "auto",
                  paddingRight: "0.5rem",
                  paddingLeft: "0.5rem",
                  fontWeight: "bold",
                  paddingBlock: "0.5rem",
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                {userP?.nombresC}
              </Box>
              <MenuItem onClick={() => handleClose("/candidate/my-account")}>
                Mi cuenta
              </MenuItem>
              <MenuItem onClick={() => handleClose("/candidate/my-cv")}>
                Mi CV
              </MenuItem>
              <MenuItem onClick={() => {
                setIsAuthenticated(!isAuthenticated);
                localStorage.removeItem("userInfo");
                localStorage.removeItem("isCompany");
                localStorage.removeItem("isAuthenticated");
                handleClose("/")
              }}>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
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
        onClick={() => navigate("/auth/company/register")}
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

    </Box>
  );
};

export default HeaderButtons;
