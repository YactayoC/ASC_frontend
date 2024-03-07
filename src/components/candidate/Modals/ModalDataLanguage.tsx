import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useForm } from "react-hook-form";
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ModalDataLanguage = (props: {
    openModalLanguage: boolean;
    handleCloseModalEditDataLanguage: () => void;
    onLanguageSave: () => void
}) => {

    const { openModalLanguage, handleCloseModalEditDataLanguage } = props;
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    const { register, handleSubmit, reset } = useForm();
    const { insertLanguagesInformation, getListLanguage } = useAccount();
    const [selectedLanguageId, setSelectedLanguageId] = useState<number | null>(null);

    const onSubmitLanguageData = async (data: any) => {
        handleCloseModalEditDataLanguage();

        if (selectedLanguageId !== null) {
            await insertLanguagesInformation(
                userInfoJson?.id_user,
                selectedLanguageId,
                data.nivel
            );
            reset();
            props.onLanguageSave();
        }
    }

    const handleClose = () => {
        handleCloseModalEditDataLanguage();
    }

    const handleGetListLanguage = async () => {
        const response = await getListLanguage();
        const dataLanguageList = response.response.data;
        console.log(dataLanguageList)
    }

    const idiomas = [
        { id: 1, name: "Español" },
        { id: 2, name: "Inglés" },
        { id: 3, name: "Quechua" },
    ]

    useEffect(() => {
        if (openModalLanguage) {
            handleGetListLanguage();
        }
    }, [openModalLanguage]);


    return (
        <Modal
            open={openModalLanguage}
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
                    Agregar idioma
                </Typography>
                <Divider />
                <FormControl
                    component={"form"}
                    onSubmit={handleSubmit(onSubmitLanguageData)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1.5rem",
                        marginTop: "1rem",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "1rem",
                        }}
                    >
                        {/* AUTOCOMPLETE DE IDIOMAS */}
                        <Autocomplete
                            fullWidth
                            options={idiomas.map((option) => option.name)}
                            onChange={(_event, value) => {
                                const idioma = idiomas.find(idioma => idioma.name === value);
                                setSelectedLanguageId(idioma?.id || null); // Si no se encuentra el idioma, se asigna null
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Idioma"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    {...register("idioma", { required: true })}
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            options={["Básico", "Intermedio", "Avanzado"]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nivel"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    {...register("nivel", { required: true })}
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

export default ModalDataLanguage;