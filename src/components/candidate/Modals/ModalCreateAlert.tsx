import { Autocomplete, Box, Button, FormControl, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { seedLocations } from "../../../seed/locations";
import { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useAlerts from "../../../hooks/Candidate/Alerts/useAlerts";
import CloseIcon from '@mui/icons-material/Close';

const ModalUpdateStatusPostulation = (props: {
    openModalUpdateStatus: boolean,
    handleCloseModalUpdateStatus: () => void
    onAlertSaved: () => void
}) => {
    const { openModalUpdateStatus, handleCloseModalUpdateStatus } = props;
    const [locationLabel, setLocationLabel] = useState(""); // Para la etiqueta de visualización
    const { register, handleSubmit, reset } = useForm();
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo as string) : null;
    const { createAlert } = useAlerts();

    const handleClose = () => {
        handleCloseModalUpdateStatus();
        reset();
        setLocationLabel("");
    }

    const flatOptions = seedLocations.flatMap(departamento =>
        departamento.provincias.map(provincia => ({
            provincia_id: provincia.provincia_id,
            label: `${departamento.nombre_departamento} - ${provincia.nombre_provincia}`,
            nombre_provincia: provincia.nombre_provincia,
            nombre_departamento: departamento.nombre_departamento,
        }))
    );

    const frequentsOptions = [
        { label: "Diario" },
        { label: "Semanal" },
        { label: "Mensual" },
    ];

    //QUIERO QUE IMPRIMA //console.log(seedLocations); SOLAMENTE CUANDO ESTÉ ABIERTO EL MODAL
    useEffect(() => {
        if (openModalUpdateStatus) {
            ////console.log(seedLocations);
            return
        }
    }, [openModalUpdateStatus]);

    const onSubmit = async (data: any) => {

        handleCloseModalUpdateStatus();
        //PETICION PARA LA BASE DE DATOS, GUARDAR ALERTA
        if (user) {
            const response = await createAlert(
                data.puesto,
                locationLabel,
                data.frecuencia,
                user.id_user
            );

            if (response.ok) {
                reset();
                props.onAlertSaved();
            }
        }
    }

    return (
        <Modal
            open={openModalUpdateStatus}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    padding: "2rem",
                    paddingBlock: "3rem",
                    borderRadius: 1,
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
                <Typography variant="h6" id="modal-title" gutterBottom align="center">
                    ¿Qué ofertas desea recibir?
                </Typography>
                <FormControl
                    component={"form"}
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                    }}
                >
                    <TextField
                        label="Puesto"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        fullWidth
                        {...register("puesto", { required: true })}
                    />

                    <Autocomplete
                        id="grouped-demo"
                        fullWidth
                        options={flatOptions}
                        value={flatOptions.find(option => option.label === locationLabel) || null}
                        groupBy={(option) => option.nombre_departamento}
                        getOptionLabel={(option) => option.label}
                        onChange={(_event, newValue) => {
                            // Obtiene el ID y el label de la nueva ubicación seleccionada
                            //const newLocationValue = newValue ? String(newValue.provincia_id) : '';
                            const newLocationLabel = newValue ? newValue.label : '';

                            // Actualiza el estado y localStorage con los nuevos valores
                            ////console.log(newLocationValue);
                            ////console.log(newLocationLabel);
                            setLocationLabel(newLocationLabel); // Esto garantiza que el label se actualice para mostrar el valor correcto

                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Ubicación"
                                fullWidth
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "100%",
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        }
                        renderOption={(props, option) => (
                            <li {...props}>
                                {option.nombre_provincia}
                            </li>
                        )}
                    />

                    {/* FECUENCIA */}
                    <Autocomplete
                        id="frecuency"
                        fullWidth
                        options={frequentsOptions}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Frecuencia"
                                {...register("frecuencia", { required: true })}
                            />}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Suscribirme
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    );
}

export default ModalUpdateStatusPostulation;