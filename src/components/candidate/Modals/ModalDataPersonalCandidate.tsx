import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useForm } from "react-hook-form";
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

type DayOption = number | '';
type DayState = DayOption;

const ModalDataPersonalCandidate = (props: { openModalDataPersonal: boolean, handleCloseModalEditDataPersonal: () => void }) => {
    const { openModalDataPersonal, handleCloseModalEditDataPersonal } = props;
    //LOCALSTORAGE
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    //REACT HOOK FORM
    const { register, handleSubmit, setValue, clearErrors, reset, formState: { errors } } = useForm();
    //USESTATES DE LOS TEXTFIELDS - INCOMPLETE INFORMATION
    const [lastNameCandidateInc, setLastNameCandidateInc] = useState('');
    const [nameCandidateInc, setNameCandidateInc] = useState('');
    //USESTATES DE LOS TEXTFIELDS - COMPLETE INFORMATION
    const [lastNameCandidate, setLastNameCandidate] = useState('');
    const [nameCandidate, setNameCandidate] = useState('');
    const [phoneCandidate, setPhoneCandidate] = useState('');
    const [addressCandidate, setAddressCandidate] = useState('');
    const [dniCandidate, setDniCandidate] = useState('');
    const [descriptionProfileCandidate, setDescriptionProfileCandidate] = useState('');
    //FECHA DE NACIMIENTO DD - MM - YYYY
    //use estate day pero que sea Number
    const [day, setDay] = useState<DayState>(''); 
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState('');

    //HOOKS
    const { getPersonalInformation, updatePersonalinformation, getTypesDocument } = useAccount();

    const handleClose = () => {
        handleCloseModalEditDataPersonal();
        setDay('');
        setMonth(null);
        reset();
    }

    const onSubmitPersonalData = (data: any) => {
        console.log(data);
    }

    //DAYS 1 AL 31
    const days: DayOption[] = Array.from({ length: 31 }, (_, i) => i + 1);
    //MES DEL 1 AL 12
    const months = [
        { id: 1, name: 'Enero' },
        { id: 2, name: 'Febrero' },
        { id: 3, name: 'Marzo' },
        { id: 4, name: 'Abril' },
        { id: 5, name: 'Mayo' },
        { id: 6, name: 'Junio' },
        { id: 7, name: 'Julio' },
        { id: 8, name: 'Agosto' },
        { id: 9, name: 'Septiembre' },
        { id: 10, name: 'Octubre' },
        { id: 11, name: 'Noviembre' },
        { id: 12, name: 'Diciembre' }
    ];


    const handleGetPersonalInformation = async () => {
        const response = await getPersonalInformation(userInfoJson?.id_user);
        const dataPersonalInformation = response.response.data;
        console.log(dataPersonalInformation)
        let quantity = Object.keys(dataPersonalInformation).length;
        // console.log(quantity)

        if (quantity > 2) {
        }
        else {
            setLastNameCandidateInc(dataPersonalInformation.apellidos);
            setNameCandidateInc(dataPersonalInformation.nombre);
        }
    }

    useEffect(() => {
        if (openModalDataPersonal) {
            handleGetPersonalInformation();
        }
    }, [openModalDataPersonal]);


    return (
        <Modal
            open={openModalDataPersonal}
            onClose={handleClose} // Utiliza el nuevo manejador aquí
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
                    Datos personal y de contacto
                </Typography>
                <Divider />
                <FormControl
                    component="form"
                    onSubmit={handleSubmit(onSubmitPersonalData)}
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
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            label="Nombres"
                            variant="outlined"
                            value={nameCandidateInc}
                            margin="normal"
                            fullWidth
                            {...register("nombre", { required: false })}
                            onChange={(e) => setNameCandidateInc(e.target.value)}
                        />
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            value={lastNameCandidateInc}
                            margin="normal"
                            fullWidth
                            {...register("apellidos", { required: false })}
                            onChange={(e) => setLastNameCandidateInc(e.target.value)}
                        />
                        {/* <Autocomplete
                            fullWidth
                            disableClearable
                            options={nationality}
                            //value={{ value: 1, label: nacionalidadCandidate }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nacionalidad"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    {...register("nacionalidad", { required: true })}
                                />
                            )}

                        /> */}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            columnGap: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            label="Celular"
                            variant="outlined"
                            margin="normal"
                            //value={phoneCandidate}
                            sx={{
                                width: "60%",
                            }}
                            //value={nacionalidadCandidate}
                            fullWidth
                            {...register("celular", { required: false })}
                        //onChange={(e) => setPhoneCandidate(e.target.value)}
                        />
                        <TextField
                            label="Dirección"
                            variant="outlined"
                            margin="normal"
                            //value={addressCandidate}
                            fullWidth
                            {...register("direccion", { required: false })}
                        //onChange={(e) => setAddressCandidate(e.target.value)}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h6" gutterBottom align="left">
                            Fecha de nacimiento
                        </Typography>

                        {errors.fechaNacimiento && <Typography variant="caption" color="error">{String(errors.fechaNacimiento.message)}</Typography>}
                        <Box
                            sx={{
                                display: "flex",
                                columnGap: "1.8rem",
                                width: "100%",
                                alignItems: "center",
                                [theme.breakpoints.down("sm")]: {
                                    flexDirection: "column",
                                    gap: "1rem",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    columnGap: "1rem",
                                }}
                            >
                                <Autocomplete
                                    sx={{ width: "20%" }}
                                    disableClearable
                                    options={days}
                                    value={day || ''}
                                    onChange={(_event, newValue: DayOption) => setDay(newValue)}
                                    getOptionLabel={(option: DayOption) => String(option)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Día"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    fullWidth
                                    disableClearable
                                    options={months}
                                    getOptionLabel={(option) => option.name}
                                    value={months.find(m => m.id === Number(month)) || { id: 0, name: '' }}
                                    onChange={(_event, newValue) => setMonth(newValue.id || null)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Mes"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}
                                />
                                {/* <Autocomplete
                                    sx={{
                                        width: "70%",
                                    }}
                                    disableClearable
                                    options={years}
                                    value={String(year)}
                                    onChange={(_event, newValue) => setYear(String(newValue || ''))}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Año"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}

                                /> */}
                            </Box>
                            {/* <Autocomplete
                                sx={{
                                    width: "40%",
                                }}
                                options={estadoCivil}
                                getOptionLabel={(option) => option.label} // Define cómo obtener la etiqueta de cada opción
                                value={estadoCivil.find(ec => ec.label === optionCivilStatus) || null} // Establece el valor actual basado en la etiqueta
                                onChange={(_event, newValue) => {
                                    setOptionCivilStatus(newValue?.label || ''); // Actualiza el estado con la etiqueta de la nueva selección
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Estado Civil"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            /> */}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "1rem",
                        }}
                    >
                        {/* <Autocomplete
                            fullWidth
                            options={dataDocumentType}
                            getOptionLabel={(option) => option.name}
                            value={dataDocumentType.find((td: any) => td.id === selectedOptionDocumentTypeId) || null}
                            onChange={(_event, newValue) => {
                                setSelectedOptionDocumentTypeId(newValue?.id);
                                setValue('tipoDocumento', newValue?.id);
                                clearErrors('documento');
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tipo documento"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            )}
                        /> */}
                        <TextField
                            label="Documento"
                            variant="outlined"
                            margin="normal"
                            //value={dniCandidate || ""}
                            //disabled={!selectedOptionDocumentTypeId}
                            fullWidth
                            {...register("documento", { required: false })}
                        //onChange={(e) => setDniCandidate(e.target.value)}
                        />
                    </Box>
                    <TextField
                        multiline
                        rows={6}
                        label="Descripción de perfil"
                        variant="outlined"
                        fullWidth
                        //value={descriptionProfileCandidate}
                        {...register("descripcionPerfil", { required: false })}
                    //onChange={(e) => setDescriptionProfileCandidate(e.target.value)}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    )
}

export default ModalDataPersonalCandidate;