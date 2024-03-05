import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import theme from '../../../../theme';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import useAccount from "../../../hooks/Candidate/Account/useAccount";

const FormDeactivateAccount = () => {

    const { register, handleSubmit} = useForm();
    const [cvVisible, setCvVisible] = useState(1);
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo as string) : null;
    const { changeVisibilityCV } = useAccount();

    const convertBooleanToNumber = (value: boolean) => { return value ? 1 : 0; }

    console.log("cvVisible", cvVisible)

    const onSubmitVisibleCV = async (data: any) => {
        if (convertBooleanToNumber(user?.cv_visible) !== Number(data.visibleCV)) {
            const response = await changeVisibilityCV(Number(data.visibleCV), user.id_user);
            if (response.ok) { // Asumiendo que response.ok indica éxito
                console.log(response)
                setCvVisible(Number(data.visibleCV));
                // Actualiza el estado local y el almacenamiento local con el nuevo valor
                const updatedUser = { ...user, cv_visible: data.visibleCV === "1" };
                localStorage.setItem("userInfo", JSON.stringify(updatedUser));

                //QUIERO 

            }
        } else if (convertBooleanToNumber(user?.cv_visible) === Number(data.visibleCV)) {
            // Si el valor no ha cambiado, simplemente retorna sin hacer nada
            console.log("No se realizó ningún cambio en la visibilidad del CV");
            return;
        }
    };

    useEffect(() => {
        // Actualiza el estado `cvVisible` basado en el valor almacenado en `localStorage`
        const storedUserInfo = localStorage.getItem("userInfo");
        const storedUser = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        if (storedUser && typeof storedUser.cv_visible !== 'undefined') {
            setCvVisible(convertBooleanToNumber(storedUser.cv_visible));
        }
    }, []);

    return (
        <FormControl
            onSubmit={handleSubmit(onSubmitVisibleCV)}
            component={"form"}
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
                Privacidad
            </Typography>

            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={cvVisible.toString()}
                name="radio-buttons-group"
                onChange={(e) => setCvVisible(Number(e.target.value))}
            >
                <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Tu CV es visible en los avisos a los que te postulaste y en otras búsquedas que realizan las empresas."
                    {...register("visibleCV")}
                />
                <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Tu CV es visible únicamente en los avisos a los que te postulaste"
                    {...register("visibleCV")}
                />
            </RadioGroup>

            <Button
                type="submit"
                variant="contained"
                color="primary"
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

export default FormDeactivateAccount;