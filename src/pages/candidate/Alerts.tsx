import HeaderButtons from "../../components/candidate/HeaderButtons";
import SearchJob from "../../components/common/SearchJob";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import theme from "../../../theme";
import ButtonSocials from "../../components/common/ButtonSocials";
import { useEffect, useState, useRef } from "react";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import useAlerts from "../../hooks/Candidate/Alerts/useAlerts";
import ModalUpdateStatusPostulation from "../../components/candidate/Modals/ModalCreateAlert";
import ModalUpdateAlert from "../../components/candidate/Modals/ModalUpdateAlert";

const Alerts = () => {
  const [open, setOpen] = useState(false);
  const [openModalEditAlert, setOpenModalEditAlert] = useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo) : null;
  const [alerts, setAlerts] = useState<any>([]);
  const [currentAlertId, setCurrentAlertId] = useState<any>(null);
  const { getAlerts } = useAlerts();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEditAlert = () => {
    setOpenModalEditAlert(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEditAlert = () => {
    setOpenModalEditAlert(false);
  }

  const handleGetAlerts = async () => {
    const response = await getAlerts(
      user?.id_user,
    );
    setAlerts(response.response);
    //console.log(response.response);
  }

  const handleGetAlertData = (idAlert: any) => {
    if (idAlert) {
      //console.log(idAlert);
      setCurrentAlertId(idAlert);
      handleOpenEditAlert();
    }
  }

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      const handleDataAlerts = async () => {
        const response = await getAlerts(user?.id_user);
        setAlerts(response.response);
        //console.log(response.response);
      };

      handleDataAlerts();
      isMounted.current = false; // Después del primer montaje, marca como no montado
    }
  }, [user?.id_user, getAlerts]);

  return (
    <>
      <HeaderButtons showLogo={true} />
      {/* Banner */}
      <HeaderMainPage />

      {/* Alertas */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5rem",
          marginBottom: "2rem",
          rowGap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <SearchJob />
        </Box>

        {/* Cuadro de alertas */}
        <Box
          sx={{
            boxShadow: 3,
            padding: "1rem",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "2rem",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "1rem",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.5rem",
                },
              }}
            >
              Mis alertas
            </Typography>
            <Button
              variant="outlined"
              onClick={handleOpen}
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

          {alerts && alerts.length > 0 ? (
            alerts.map((alert: any) => (
              <Box
                key={alert.id}
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
                      padding: "0.8rem",
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "1.2rem",
                        },
                      }}
                    >
                      Frecuencia de envío
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {alert.frecuencia}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Puesto: {alert.puesto_interes}
                    </Typography>
                  </Box>

                  <Button variant="outlined" onClick={() => {
                    handleGetAlertData(alert.id);
                  }}>Editar</Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="h6" gutterBottom textAlign="center">
              No hay alertas creadasFrecuencia de envío
            </Typography>
          )}

        </Box>
      </Container>

      <ModalUpdateStatusPostulation openModalUpdateStatus={open} handleCloseModalUpdateStatus={handleClose} onAlertSaved={async () => {
        await handleGetAlerts();
      }} />
      <ModalUpdateAlert openModalUpdateStatus={openModalEditAlert} handleCloseModalUpdateStatus={handleCloseEditAlert} alertId={currentAlertId} onAlertSaved={async () => {
        await handleGetAlerts();
      }} />

      <ButtonSocials />
    </>
  );
};

export default Alerts;
