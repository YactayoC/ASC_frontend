import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@mui/material";

import theme from "../../../theme";
import HeaderButtons from "../../components/candidate/HeaderButtons";
import { useEffect, useRef, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import ModalChangeEmail from "../../components/candidate/Modals/ModalChangeEmail";
import FormChangePassword from "../../components/candidate/SecurityTab/FormChangePassword";
import FormDeactivateAccount from "../../components/candidate/SecurityTab/FormDeactivateAccount";
import FormChangeVisibleCV from "../../components/candidate/SecurityTab/FormChangeVisibleCV";
import useAccount from "../../hooks/Candidate/Account/useAccount";

const MyAccount = () => {
  const userInfo = localStorage.getItem("userInfo");
  const user = userInfo ? JSON.parse(userInfo as string) : null;
  const [tabValue, setTabValue] = useState(0);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const { getIncompletePersonalInformation } = useAccount();
  const [personalIncompleteInformation, setPersonalIncompleteInformation] = useState<any>({});

  const handleOpenModalEmail = () => {
    setOpenModalEmail(true);
  };

  const handleCloseModalEmail = () => {
    setOpenModalEmail(false);
  };

  const handleChange = (_e: any, newValue: number) => {
    setTabValue(newValue);
  };

  const createdAt = user?.created_at;
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('es-ES') : "";

  const isMounted = useRef(true);

  const handleGetIncompletePersonalInformation = async () => {
    const response = await getIncompletePersonalInformation(user?.id_user);
    const dataPersonalInformation = response.response.data;
    setPersonalIncompleteInformation(dataPersonalInformation);
    //console.log(dataPersonalInformation)
    //setSelectedFile(dataPersonalInformation.cv_visible);
    return
  }

  useEffect(() => {
    if (isMounted.current) {
      handleGetIncompletePersonalInformation();
    }

    return () => {
      isMounted.current = false;
    }
  }, [])

  return (
    <>
      <HeaderButtons showLogo={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          marginBottom: "2rem",
          rowGap: "2rem",
          border: "1px solid #a7a7a7",
          backgroundColor: "white",
          padding: "1rem",
          width: "100%",
          maxWidth: "95%",
          margin: "auto",
        }}
      >
        <Typography variant="h4" textAlign="left" gutterBottom>
          Mi cuenta
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <Box sx={{ width: "100%", borderBottom: "1px solid #a7a7a7" }}>
            <Tabs value={tabValue}>
              <Tab
                value={0}
                label="Información personal"
                onClick={(e) => handleChange(e, 0)}
              />
              <Tab
                value={1}
                label="Seguridad"
                onClick={(e) => handleChange(e, 1)}
              />
            </Tabs>
          </Box>
        </Box>

        {/* Cuadro segun tab */}
        {tabValue === 0 && (
          <Box
            sx={{
              //   boxShadow: 3,
              padding: "1rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "2rem",
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.2rem",
              }}
            >
              {personalIncompleteInformation.nombre}, aquí podrás gestionar tu cuenta.
            </Typography>

            <Box
              display="flex"
              alignItems="start"
              gap={"2rem"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  gap: "1rem",
                },
              }}
            >
              <img
                src="https://fotosprofesionales.es/wp-content/uploads/2023/08/fotografo-de-retrato-madrid-foto-corporativa-hombre-12.jpg"
                alt="avatar"
                style={{
                  width: "8rem",
                  height: "10rem",
                  cursor: "pointer",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "0.5rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {personalIncompleteInformation.nombre} {personalIncompleteInformation.apellidos}
                  </Typography>
                  <IconButton onClick={() => {
                    console.log("first")
                  }}>
                    <EditOutlined />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "0.5rem",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    {personalIncompleteInformation.email}
                  </Typography>
                  <IconButton onClick={handleOpenModalEmail}>
                    <EditOutlined />
                  </IconButton>
                </Box>

                <Typography variant="body1" color="#a7a7a7">
                  Miembro desde: {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box
            sx={{
              padding: "1rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "2rem",
            }}
          >
            <FormChangePassword />
            <Divider />
            <FormChangeVisibleCV />
            <Divider />
            <FormDeactivateAccount />
          </Box >
        )}
      </Box >

      <ModalChangeEmail openModalEmail={openModalEmail} handleCloseModalChangeEmail={handleCloseModalEmail} />
    </>
  );
};

export default MyAccount;
