import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@mui/material';
import theme from '../../../../theme';
import { useForm } from 'react-hook-form';
import useAccount from '../../../hooks/Candidate/Account/useAccount';

const FormChangePassword = () => {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const { updatePasswordCandidate } = useAccount();
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");

    const onSubmitPassword = async (data: any) => {
        const response = await updatePasswordCandidate(
            userInfoJson?.id_user,
            data.newPassword
        );
        if (response.ok) {
            reset();
        }
    }

    return (
        <FormControl
            component={"form"}
            onSubmit={handleSubmit(onSubmitPassword)}
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
            }}
        >
            <Typography
                gutterBottom
                sx={{
                    fontSize: "1.5rem",
                }}
            >
                Cambiar contraseña
            </Typography>
            <Typography
                gutterBottom
                sx={{
                    fontSize: "1.2rem",
                    color: "#a7a7a7",
                }}
            >
                Cambia tu contraseña para proteger tu cuenta.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "8rem",
                    [theme.breakpoints.down("md")]: {
                        flexDirection: "column",
                        alignItems: "start",
                        gap: "1rem",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        label="Nueva contraseña"
                        variant="outlined"
                        type="password"
                        sx={{
                            width: "20rem",
                        }}
                        {...register("newPassword", {
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres" // Mensaje de error cuando no se cumple la condición
                            }
                        })}
                    />
                    {errors.newPassword &&
                        <Typography variant="caption" color="error">
                            {String(errors.newPassword.message)}
                        </Typography>
                    }
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        label="Confirma nueva contraseña"
                        variant="outlined"
                        sx={{
                            width: "20rem",
                        }}
                        type="password"
                        {...register("confirmNewPassword", {
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            },
                            validate: value =>
                                value === watch('newPassword') || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.confirmNewPassword &&
                        <Typography variant="caption" color="error">
                            {String(errors.confirmNewPassword.message)}
                        </Typography>
                    }
                </Box>
            </Box>
            <Box>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Solicita que todos los dispositivos inicien sesión con la nueva contraseña"
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    width: "fit-content",
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                    },
                }}
            >
                Guardar
            </Button>
        </FormControl>
    );
}

export default FormChangePassword;