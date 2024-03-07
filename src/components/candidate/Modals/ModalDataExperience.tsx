import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
//react hook form
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';

const ModalDataExperience = (props: {
  openModalExperience: boolean,
  handleCloseModalEditDataExperience: () => void
  onExperienceSaved: () => void
}) => {

  const { openModalExperience, handleCloseModalEditDataExperience } = props;
  const userInfo = localStorage.getItem("userInfo");
  const userInfoJson = JSON.parse(userInfo || "{}");
  const { register, handleSubmit, reset } = useForm();
  const { insertExperienceInformation, } = useAccount();

  const onSubmitExperienceData = async (data: any) => {
    handleCloseModalEditDataExperience();

    console.log(userInfoJson?.id_user);
    console.log(data);

    await insertExperienceInformation(
      userInfoJson?.id_user,
      data.cargo,
      data.funciones,
      data.empresa,
      data.añoInicio,
      data.añoFin
    );

    reset();
    props.onExperienceSaved();
  }

  const handleClose = () => {
    handleCloseModalEditDataExperience();
  }

  return (
    <Modal
      open={openModalExperience}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: "2rem",
          paddingBlock: "3rem",
          borderRadius: 1,
          [theme.breakpoints.down("sm")]: {
            width: "95%",
            padding: "1rem",
            paddingBlock: "2rem",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" id="modal-title" gutterBottom align="left">
          Experiencia laboral
        </Typography>
        <Divider />
        <FormControl
          component={"form"}
          onSubmit={handleSubmit(onSubmitExperienceData)}
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          <TextField
            label="Cargo"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("cargo", { required: true })}
          />

          <TextField
            label="Funciones"
            variant="outlined"
            multiline
            minRows={4}
            fullWidth
            {...register("funciones", { required: true })}
          />

          <TextField
            label="Empresa"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("empresa", { required: true })}
          />
          <Box
            sx={{
              display: "flex",
              columnGap: "1rem",
            }}
          >
            <Autocomplete
              fullWidth
              options={["2022", "2023", "2024"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Año Inicio"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("añoInicio", { required: true })}
                />
              )}
            />

            <Autocomplete
              fullWidth
              options={["2022", "2023", "2024"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Año Fin"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("añoFin", { required: true })}
                />
              )}
            />
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}

export default ModalDataExperience;