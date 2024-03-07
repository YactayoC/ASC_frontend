import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useForm } from "react-hook-form";
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import CloseIcon from '@mui/icons-material/Close';

const ModalDataStudies = (props: {
    openModalStudy: boolean,
    handleCloseModalEditDataStudies: () => void
    onStudtySave: () => void
}) => {
    const { openModalStudy, handleCloseModalEditDataStudies } = props;
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    const { register, handleSubmit, reset } = useForm();
    const { insertStudiesInformation, } = useAccount();

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
                    <TextField
                        label="Descripción del titulo"
                        variant="outlined"
                        multiline
                        minRows={4}
                        fullWidth
                        {...register("descripcionTitulo", { required: true })}
                    />

                    <TextField
                        label="Titulo"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        {...register("titulo", { required: true })}
                    />

                    <TextField
                        label="Institución"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        {...register("institucion", { required: true })}
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

export default ModalDataStudies;