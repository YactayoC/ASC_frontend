import { Autocomplete, Box, Button, Divider, FormControl, FormHelperText, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
//react hook form
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const ModalDataExperience = (props: {
  openModalExperience: boolean,
  handleCloseModalEditDataExperience: () => void
  onExperienceSaved: () => void
}) => {

  const { openModalExperience, handleCloseModalEditDataExperience } = props;
  const userInfo = localStorage.getItem("userInfo");
  const userInfoJson = JSON.parse(userInfo || "{}");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { insertExperienceInformation, } = useAccount();
  const [funcionesValue, setFuncionesValue] = useState('');
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);

  const startYearOptions = Array.from({ length: 55 }, (_, i) => (1970 + i).toString()).filter(year => !endYear || parseInt(year) <= endYear);
  const endYearOptions = Array.from({ length: 41 }, (_, i) => (1970 + i).toString()).filter(year => !startYear || parseInt(year) >= startYear);

  const handleStartYearChange = (_event: any, value: any) => {
    setStartYear(value);
  };
  const handleEndYearChange = (_event: any, value: any) => {
    setEndYear(value);
  };

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 500) {
      setFuncionesValue(inputValue);
    }
  };
  
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
    reset();
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
          <Box>
            <TextField
              label="Cargo"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("cargo", {
                required: "Debe ingresar su cargo",
                pattern: {
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "Debe ingresar un cargo válido",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres"
                }
              })}
            />
            {errors.cargo && <Typography variant="caption" color="error">{String(errors.cargo.message)}</Typography>}
          </Box>

          <Box>
            <TextField
              label="Funciones"
              aria-disabled
              variant="outlined"
              value={funcionesValue}
              multiline
              rows={7}
              fullWidth
              {...register("funciones", {
                required: "Debe ingresar las funciones",
                pattern: {
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "Debe ingresar funciones válidas",
                },
                maxLength: {
                  value: 500,
                  message: "Máximo 500 caracteres"
                }
              })}
              onChange={handleChange}
            />
            <FormHelperText>
              Caracteres restantes: {500 - funcionesValue.length} de 500
            </FormHelperText>
            {errors.funciones && <Typography variant="caption" color="error">{String(errors.funciones.message)}</Typography>}
          </Box>

          <Box>
            <TextField
              label="Empresa"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("empresa", {
                required: "Debe ingresar el nombre de la empresa",
                pattern: {
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "Debe ingresar un nombre de empresa válido",
                },
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres"
                }
              })}
            />
            {errors.empresa && <Typography variant="caption" color="error">{String(errors.empresa.message)}</Typography>}
          </Box>
          <Box
            sx={{
              display: 'flex',
              columnGap: '1rem',
            }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Autocomplete
                fullWidth
                options={startYearOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Año Inicio"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register('añoInicio', { required: true })}
                  />
                )}
                onChange={handleStartYearChange}
              />
              {errors.añoInicio && <Typography variant="caption" color="error">Debe ingresar el año de inicio</Typography>}
            </Box>

            <Box
              sx={{
                width: '100%',
              }}
            >
              <Autocomplete
                fullWidth
                options={endYearOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Año Fin"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register('añoFin', { required: true })}
                  />
                )}
                onChange={handleEndYearChange}
              />
              {errors.añoFin && <Typography variant="caption" color="error">Debe ingresar el año de fin</Typography>}
            </Box>
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