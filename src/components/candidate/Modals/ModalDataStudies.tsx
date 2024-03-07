import { Autocomplete, Box, Button, Divider, FormControl, FormHelperText, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useForm } from "react-hook-form";
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const ModalDataStudies = (props: {
    openModalStudy: boolean,
    handleCloseModalEditDataStudies: () => void
    onStudtySave: () => void
}) => {
    const { openModalStudy, handleCloseModalEditDataStudies } = props;
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { insertStudiesInformation, } = useAccount();
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [descripcionTitle, setDescripcionTitle] = useState('');

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
            setDescripcionTitle(inputValue);
        }
    };

    const onSubmitStudiesData = async (data: any) => {
        handleCloseModalEditDataStudies();
        await insertStudiesInformation(
            userInfoJson?.id_user,
            data.descripcionTitulo,
            data.titulo,
            data.institucion,
            data.añoInicio,
            data.añoFin
        );

        //LIMPIAR CAMPOS DEL MODAL
        reset();
        props.onStudtySave();
    }

    const handleClose = () => {
        handleCloseModalEditDataStudies();
        reset();
    }

    return (
        <Modal open={openModalStudy} onClose={handleClose}>
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
                    Agregar estudio
                </Typography>
                <Divider />
                <FormControl
                    component={"form"}
                    onSubmit={handleSubmit(onSubmitStudiesData)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1.5rem",
                        marginTop: "1rem",
                    }}
                >
                    <Box>
                        <TextField
                            label="Descripción del título"
                            variant="outlined"
                            aria-disabled
                            multiline
                            value={descripcionTitle}
                            minRows={5}
                            fullWidth
                            inputProps={{
                                maxLength: 500,
                                pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                            }}
                            {...register("descripcionTitulo", {
                                required: "Por favor, ingrese la descripción del título",
                                pattern: {
                                    value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                                    message: "Por favor, ingrese una descripción válida",
                                },
                                maxLength: {
                                    value: 500,
                                    message: "La descripción debe tener máximo 500 caracteres",
                                },
                            })}
                            onChange={handleChange}
                        />
                        <FormHelperText>
                            Caracteres restantes: {500 - descripcionTitle.length} de 500
                        </FormHelperText>
                        {errors.descripcionTitulo && (
                            <Typography variant="caption" color="error">
                                {String(errors.descripcionTitulo.message)}
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        <TextField
                            label="Título"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                maxLength: 50,
                                pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                            }}
                            {...register("titulo", {
                                required: "Por favor, ingrese el título",
                                pattern: {
                                    value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                                    message: "Por favor, ingrese un título válido",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "El título debe tener máximo 50 caracteres",
                                },
                            })}
                        />
                        {errors.titulo && (
                            <Typography variant="caption" color="error">
                                {String(errors.titulo.message)}
                            </Typography>
                        )}
                    </Box>

                    <Box>
                        <TextField
                            label="Institución"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            inputProps={{
                                maxLength: 50,
                                pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                            }}
                            {...register("institucion", {
                                required: "Debe ingresar la institución",
                                pattern: {
                                    value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]+$/,
                                    message: "Debe ingresar una institución válida",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Máximo 50 caracteres",
                                },
                            })}
                        />
                        {errors.institucion && (
                            <Typography variant="caption" color="error">
                                {String(errors.institucion.message)}
                            </Typography>
                        )}
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

export default ModalDataStudies;