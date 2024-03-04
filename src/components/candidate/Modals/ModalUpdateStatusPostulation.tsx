import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const ModalUpdateStatusPostulation = ({ postulation, onClose }: any) => {
    const { open } = postulation;
    const { register, handleSubmit } = useForm();
    const handleClose = () => {
        onClose();
    }

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <Modal
            open={open}
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
                    width: 350,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    padding: "2rem",
                    paddingBlock: "3rem",
                }}
            >
                <Typography variant="h6" id="modal-title" gutterBottom align="center">
                    ¿Qué ofertas desea recibir?
                </Typography>
                <FormControl
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
                    />
                    <FormControl fullWidth>
                        <InputLabel id="select-ubicacion">Ubicacion</InputLabel>
                        <Select
                            labelId="select-ubicacion"
                            id="demo-simple-select"
                            value={10}
                            label="Ubicacion"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Lima</MenuItem>
                            <MenuItem value={20}>Chilca</MenuItem>
                            <MenuItem value={30}>Villa El Salvador</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="select-frecuencia">
                            Frecuencia de notificaciones
                        </InputLabel>
                        <Select
                            labelId="select-frecuencia"
                            id="demo-simple-select"
                            value={10}
                            label="Frecuencia de notificaciones"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Una vez cada 2 días</MenuItem>
                            <MenuItem value={20}>Una vez cada 3 días</MenuItem>
                            <MenuItem value={30}>Una vez a la semana</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Suscribirme
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    );
}

export default ModalUpdateStatusPostulation;