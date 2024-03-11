import { useForm } from "react-hook-form";
import { Box, FormControl, Modal, TextField, Typography, Button, InputAdornment, Autocomplete, IconButton } from "@mui/material";
import { seedLocations } from "../../../seed/locations";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from "react";
import useAlerts from "../../../hooks/Candidate/Alerts/useAlerts";
import CloseIcon from '@mui/icons-material/Close';

const ModalUpdateAlert = (props: {
    openModalUpdateStatus: boolean,
    handleCloseModalUpdateStatus: () => void
    alertId: any,
    onAlertSaved: () => void
}) => {

    const { openModalUpdateStatus, handleCloseModalUpdateStatus, alertId } = props;
    const [locationLabel, setLocationLabel] = useState(""); // Para la etiquet
    const [puestoInteres, setPuestoInteres] = useState("");
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo as string) : null;
    const [frecuencia, setFrecuencia] = useState("");
    const { register, handleSubmit, setValue } = useForm();
    const { updateAlert, getAlertById } = useAlerts();
    const handleClose = () => {
        setFrecuencia("");
        setPuestoInteres("");
        setLocationLabel("");
        handleCloseModalUpdateStatus();
    }

    const flatOptions = seedLocations.flatMap(departamento =>
        departamento.provincias.map(provincia => ({
            provincia_id: provincia.provincia_id,
            label: `${departamento.nombre_departamento} - ${provincia.nombre_provincia}`,
            nombre_provincia: provincia.nombre_provincia,
            nombre_departamento: departamento.nombre_departamento,
        }))
    );

    const onSubmit = async (data: any) => {
        await updateAlert(
            alertId,
            data.puesto,
            locationLabel,
            data.frecuencia,
            user.id_user
        );
        props.onAlertSaved();
        handleClose();
    }

    const frequentsOptions = [
        { label: "Diario" },
        { label: "Semanal" },
        { label: "Mensual" },
    ]

    useEffect(() => {
        const fetchData = async () => {
            if (alertId && openModalUpdateStatus) {
                const response = await getAlertById(alertId);
                if (response) {
                    const { puesto_interes, ubicacion, frecuencia } = response.response;
                    setPuestoInteres(puesto_interes);
                    setLocationLabel(ubicacion);
                    setFrecuencia(frecuencia);
                    setValue("puesto", puesto_interes);
                    setValue("frecuencia", frecuencia);
                }
            }
        };

        fetchData();
    }, [alertId, openModalUpdateStatus, setValue]);


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
                    Editar alerta
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
                        value={puestoInteres}
                        type="text"
                        fullWidth
                        {...register("puesto", { required: true })}
                        onChange={(e) => setPuestoInteres(e.target.value)}
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
                            const newLocationValue = newValue ? String(newValue.provincia_id) : '';
                            const newLocationLabel = newValue ? newValue.label : '';

                            // Actualiza el estado y localStorage con los nuevos valores
                            //console.log(newLocationValue);
                            //console.log(newLocationLabel);
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
                        value={frecuencia.length > 0 ? { label: frecuencia } : null}
                        options={frequentsOptions}
                        onChange={(_event, newValue) => {
                            // Obtiene el valor de la nueva frecuencia seleccionada
                            const newFrecuencia = newValue ? newValue.label : '';

                            // Actualiza el estado con el nuevo valor
                            setFrecuencia(newFrecuencia);
                        }
                        }
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

export default ModalUpdateAlert;