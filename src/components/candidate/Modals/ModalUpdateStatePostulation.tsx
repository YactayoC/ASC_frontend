import { Box, Typography, Modal, FormControl, TextField, Button, Autocomplete, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePostulations from "../../../hooks/Candidate/Postulations/usePostulations";
import CloseIcon from '@mui/icons-material/Close';

const ModalUpdateStatePostulation = (props: {
    openModalUpdateStatePostulation: boolean,
    handleModalUpdateStatePostulation: () => void,
    descriptionOption: any
    postulationId: any
    jobData: any
    onStateUpdated: () => void
}) => {

    const { openModalUpdateStatePostulation, handleModalUpdateStatePostulation, descriptionOption, postulationId, jobData } = props;
    const { register, handleSubmit } = useForm();
    const [descriptionData, setDescriptionData] = useState("");
    const { updatePostulationState } = usePostulations();
    const [hasChanged, setHasChanged] = useState(false);
    const handleClose = () => {
        handleModalUpdateStatePostulation();
        setDescriptionData("");
    }

    const onSubmit = async (data: any) => {
        //cerrar modal
        if (hasChanged) {
            handleModalUpdateStatePostulation();
            const response = await updatePostulationState(
                postulationId,
                data.estado_descripcion
            );

            console.log(response)

            if (response.ok) {
                props.onStateUpdated();
            }
        }
    }

    const descriptionState = [
        "No me han contactado",
        "Me llamaron para una entrevista",
        "Me entrevistaron",
        "Quedé seleccionado",
        "No quedé seleccionado",
    ]

    useEffect(() => {
        if (openModalUpdateStatePostulation && descriptionOption) {
            const matchingOption = descriptionState.find(option => option === descriptionOption) || "";
            setDescriptionData(matchingOption);
            setHasChanged(false);
        }
    }, [openModalUpdateStatePostulation, descriptionOption]);

    return (
        <Modal
            open={openModalUpdateStatePostulation}
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
                <Typography variant="h6" id="modal-title" gutterBottom align="center" marginBottom={"1rem"}>
                    Actualizar estado
                </Typography>
                <Typography variant="body1" id="modal-title" gutterBottom align="center" marginBottom={"1rem"}>
                    ¿Cómo te fue en el proceso de selección de {jobData}?
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
                    <Autocomplete
                        disableClearable
                        id="description"
                        fullWidth
                        options={descriptionState}
                        value={descriptionData || ""}
                        onChange={(_event, newValue) => {
                            setDescriptionData(newValue);
                            // Verifica si newValue es diferente a descriptionOption para establecer hasChanged
                            if (newValue !== descriptionOption) {
                                setHasChanged(true);
                            } else {
                                setHasChanged(false);
                            }
                        }}
                        isOptionEqualToValue={(option, value) => option === value}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Estado"
                                {...register("estado_descripcion", { required: true })}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Actualizar
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    );
}

export default ModalUpdateStatePostulation;