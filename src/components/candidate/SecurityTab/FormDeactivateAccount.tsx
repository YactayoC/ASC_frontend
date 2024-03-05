import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import theme from '../../../../theme';
import { useForm } from 'react-hook-form';
import useAccount from "../../../hooks/Candidate/Account/useAccount";

const FormChangeVisibleCV = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo as string) : null;
    const { deactivateAccount } = useAccount();

    const onSubmitDeactivateAccount = async (data: any) => {
        const response = await deactivateAccount(user.id_user, data.reason);
        if (response.ok) {
            console.log(response);
            //navigate("/")
            //localStorage.clear();
        }
    }

    return (
        <FormControl
            component={"form"}
            onSubmit={handleSubmit(onSubmitDeactivateAccount)}
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
            }}
        >
            <Typography
                gutterBottom
                sx={{
                    fontSize: "1.2rem",
                }}
            >
                ¿Por qué quieres eliminar tu cuenta?
            </Typography>
            <Box
                width="60%"
                sx={{
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                    },
                }}
            >
                <TextField
                    label="Motivo"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    {...register("reason", {
                        required: "Por favor ingresa un motivo para eliminar tu cuenta"
                    })}
                />
                {errors.reason &&
                    <Typography variant="caption" color="error">
                        {String(errors.reason.message)}
                    </Typography>
                }
            </Box>
            <Button
                variant="contained"
                type="submit"
                //onClick={() => setActiveForm("deactivate")}
                color="primary"
                sx={{
                    width: "fit-content",
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                    },
                }}
            >
                Eliminar
            </Button>
        </FormControl>
    );
}

export default FormChangeVisibleCV;
