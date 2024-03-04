import { Box, Typography, Modal, FormControl, TextField, Button, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ModalUpdateStatePostulation = (props: {
    openModalUpdateStatePostulation: boolean,
    handleModalUpdateStatePostulation: () => void,
    descriptionOption: any
    postulationId: any
    jobData: any
}) => {

    const { openModalUpdateStatePostulation, handleModalUpdateStatePostulation, descriptionOption, postulationId, jobData } = props;
    const { register, handleSubmit } = useForm();
    const [descriptionData, setDescriptionData] = useState("");
    const [postulationIdData, setPostulationIdData] = useState("");
    const handleClose = () => {
        handleModalUpdateStatePostulation();
        setDescriptionData("");
    }

    console.log(jobData)

    const onSubmit = async (data: any) => {
        console.log(data);
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
            // Asegúrate de que descriptionOption sea un string que coincida con uno de los labels
            setDescriptionData(descriptionOption);
            setPostulationIdData(postulationId);
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
                }}
            >
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
                        value={descriptionData}
                        onChange={(_event, newValue) => {
                            setDescriptionData(newValue);
                        }}
                        onBlur={(_event) => {

                        }
                        }
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Estado"
                                {...register("estado_descripcion", { required: true })}
                            />}
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