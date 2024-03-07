import { Box, Button, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import { useNavigate } from "react-router-dom";

const ModalChangeEmail = (props: {
    openModalEmail: boolean;
    handleCloseModalChangeEmail: () => void;
}) => {
    const navigate = useNavigate();
    const { openModalEmail, handleCloseModalChangeEmail } = props;
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { changeEmailCandidate } = useAccount();

    const onSubmitChangeEmail = async (data: any) => {
        console.log(userInfoJson?.id_user);
        console.log(data.emailNuevo);

        const response = await changeEmailCandidate(
            userInfoJson?.id_user,
            data.emailNuevo
        );

        if (response.ok) {
            handleCloseModalChangeEmail();
            localStorage.removeItem("userInfo");
            localStorage.setItem("isAuthenticated", "false");
            localStorage.removeItem("isCompany");
            navigate("/")
        }
    }

    const handleClose = () => {
        handleCloseModalChangeEmail();
    }

    return (
        <Modal
            open={openModalEmail}
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
                    Modificar email
                </Typography>

                {/* CAMBIAR EL EMAIL - FALTA RUTA */}
                <FormControl
                    component="form"
                    onSubmit={handleSubmit(onSubmitChangeEmail)} // Utiliza el método handleSubmit de React Hook Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "0.5rem",
                    }}
                >
                    <TextField
                        label="Email actual"
                        variant="outlined"
                        margin="normal"
                        disabled
                        type="email"
                        defaultValue={userInfoJson?.emailCandidate}
                        fullWidth
                    />
                    <Box>
                        <TextField
                            {...register("emailNuevo", { required: true })} // Registra este campo también
                            label="Email nuevo"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        {errors.emailNuevo && <Typography variant="caption" color="error">Este campo es requerido</Typography>}
                    </Box>
                    <Box>
                        <TextField
                            {...register("repetirEmailNuevo", {
                                validate: value => value === watch('emailNuevo') || "Los emails no coinciden" // Valida que este campo coincida con emailNuevo
                            })}
                            label="Repetir email nuevo"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            helperText={errors.repetirEmailNuevo &&
                                <Typography variant="caption" color="error">{String(errors.repetirEmailNuevo.message)}</Typography>
                            }
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

export default ModalChangeEmail;