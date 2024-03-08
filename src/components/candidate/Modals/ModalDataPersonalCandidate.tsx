import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import theme from "../../../../theme";
import { useForm } from "react-hook-form";
import useAccount from "../../../hooks/Candidate/Account/useAccount";
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

type DayOption = number | '';
type YearOption = number | '';

const ModalDataPersonalCandidate = (props: { openModalDataPersonal: boolean, handleCloseModalEditDataPersonal: () => void }) => {
    const { openModalDataPersonal, handleCloseModalEditDataPersonal } = props;
    //LOCALSTORAGE
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    //REACT HOOK FORM
    const { register, handleSubmit, setValue, clearErrors, reset, formState: { errors } } = useForm();
    //USESTATES DE LOS TEXTFIELDS - COMPLETE INFORMATION
    const [lastNameCandidate, setLastNameCandidate] = useState('');
    const [nameCandidate, setNameCandidate] = useState('');
    const [phoneCandidate, setPhoneCandidate] = useState('');
    const [addressCandidate, setAddressCandidate] = useState('');
    const [dniCandidate, setDniCandidate] = useState('');
    const [descriptionProfileCandidate, setDescriptionProfileCandidate] = useState('');
    const [countryCandidateId, setCountryCandidateId] = useState<any>('');
    const [dayId, setDayId] = useState<Number | null>(null);
    const [monthId, setMonthId] = useState<any>(null);
    const [yearId, setYearId] = useState<Number | null>(null);
    const [typeDocumentId, setTypeDocumentId] = useState<any>('');
    const [optionCivilStatus, setOptionCivilStatus] = useState<any>('');
    //USESTATE PARA EL AUTOCOMPLETE DE PAISES
    const [countriesList, setCountriesList] = useState<any[]>([]);
    //USESTATE PARA EL AUTOCOMPLETE DE TIPO DE DOCUMENTO
    const [dataDocumentType, setDataDocumentType] = useState<any[]>([]);
    //USESTATE PARA EL AUTOCOMPLETE DE ESTADO CIVIL
    const [estadoCivilList, setEstadoCivilList] = useState<any[]>([]);
    //VERIIFCAR SI SE CAMBIARON LOS DATOS COMPLETE
    const [dataCandidate, setDataCandidate] = useState({});

    //HOOKS
    const { getPersonalInformation, updatePersonalinformation, getTypesDocument, getCountries, getCivilStatus } = useAccount();

    const handleClose = () => {
        setLastNameCandidate('');
        setNameCandidate('');
        setPhoneCandidate('');
        setAddressCandidate('');
        setDniCandidate('');
        handleCloseModalEditDataPersonal();
        setDayId(null);
        setYearId(null);
        setMonthId(null);
        setCountryCandidateId('');
        setTypeDocumentId('');
        setOptionCivilStatus('');
        reset();
    }

    const onSubmitPersonalData = async (data: any) => {
        const dateFormat: any = dayId !== null && monthId !== null && yearId !== null ? `${dayId}-${monthId}-${yearId}` : null;
        console.log(dataCandidate) // LO QUE SE RECIBE DE LA CONSULTA

        //LO QUE SE MANDARÁ A LA PETICION
        const dataToSend = {
            postulanteId: userInfoJson?.id_user,
            nombre: data.nombre || nameCandidate || null,
            apellidos: data.apellidos || lastNameCandidate || null,
            numero: data.numero || phoneCandidate || null,
            direccion: data.direccion || addressCandidate || null,
            documento: dniCandidate || data.documento || null,
            descripcionPerfil: data.descripcionPerfil || descriptionProfileCandidate || null,
            fechaNacimiento: dateFormat || null,
            paisId: countryCandidateId || null,
            estadoCivil: optionCivilStatus || null,
            tipoDocumentoId: typeDocumentId || null
        }

        if (JSON.stringify(dataToSend) === JSON.stringify(dataCandidate)) {
            console.log("NO SE MANDARÁ")
            return
        }

        console.log(dataToSend)
        console.log("SE MANDARÁ")

        // const dataToSendAwait = {
        //     userInfoJson: userInfoJson?.id_user,
        //     nombre: data.nombre || nameCandidate || null,
        //     apellidos: data.apellidos || lastNameCandidate || null,
        //     numero: data.numero || phoneCandidate || null,
        //     direccion: data.direccion || addressCandidate || null,
        //     documento: data.documento || dniCandidate || null,
        //     descripcionPerfil: data.descripcionPerfil || descriptionProfileCandidate || null,
        //     fechaNacimiento: dateFormat || null,
        //     paisId: countryCandidateId || null,
        //     estadoCivil: optionCivilStatus || null,
        //     tipoDocumentoId: typeDocumentId || null,
        // }
        // console.log(dataToSendAwait)

        const response = await updatePersonalinformation(
            userInfoJson?.id_user,
            data.nombre || nameCandidate || null,
            data.apellidos || lastNameCandidate || null,
            countryCandidateId || null,
            dateFormat || null,
            optionCivilStatus || null,
            typeDocumentId || null,
            data.documento || dniCandidate || null,
            data.descripcionPerfil || descriptionProfileCandidate || null,
            data.numero || phoneCandidate || null,
            data.direccion || addressCandidate || null
        );

        console.log(response)

        if (response.ok) {
            window.location.reload();
            handleClose();

            const updatedUserInfo = {
                ...userInfoJson,
                nombresC: data.nombre || nameCandidate || null,
                apellidosC: data.apellidos || lastNameCandidate || null,
            }

            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            window.location.reload();
        }
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
    //AÑOS DEL 1970 AL 2024
    const years: YearOption[] = Array.from({ length: 54 }, (_, i) => 1970 + i);

    const handleGetPersonalInformation = async () => {
        const response = await getPersonalInformation(userInfoJson?.id_user);
        const dataPersonalInformation = response.response.data;

        let yearInfo = null;
        let monthInfo = null;
        let dayInfo = null;

        if (dataPersonalInformation.fecha_nacimiento) {
            const [day, month, year] = dataPersonalInformation.fecha_nacimiento.split('-');
            yearInfo = parseInt(year);
            monthInfo = parseInt(month);
            dayInfo = parseInt(day);
        }

        console.log(dataPersonalInformation)

        const dateFormat = dayId !== null && monthId !== null && yearId !== null ? `${dayId}-${monthId}-${yearId}` : null;

        setLastNameCandidate(dataPersonalInformation.apellidos);
        setNameCandidate(dataPersonalInformation.nombre);
        setPhoneCandidate(dataPersonalInformation.numero);
        setAddressCandidate(dataPersonalInformation.direccion);
        setDniCandidate(dataPersonalInformation.documento);
        setDescriptionProfileCandidate(dataPersonalInformation.descripcion_perfil);
        setCountryCandidateId(dataPersonalInformation.pais_id);
        setDayId(dayInfo || null);
        setMonthId(monthInfo || null);
        setYearId(yearInfo || null);
        setTypeDocumentId(dataPersonalInformation.tipo_documento_id);
        setOptionCivilStatus(dataPersonalInformation.estado_civil_id);
        setDataCandidate({
            postulanteId: userInfoJson?.id_user,
            nombre: dataPersonalInformation.nombre || null,
            apellidos: dataPersonalInformation.apellidos || null,
            numero: dataPersonalInformation.numero || null,
            direccion: dataPersonalInformation.direccion || null,
            documento: dataPersonalInformation.documento || null,
            descripcionPerfil: dataPersonalInformation.descripcion_perfil || null,
            fechaNacimiento: dateFormat,
            paisId: dataPersonalInformation.pais_id || null,
            estadoCivil: dataPersonalInformation.estado_civil_id || null,
            tipoDocumentoId: dataPersonalInformation.tipo_documento_id || null
        });

    }

    const handleGetCountries = async () => {
        const response = await getCountries();
        setCountriesList(response.response);
    }

    const handleGetTypesDocument = async () => {
        const response = await getTypesDocument();
        setDataDocumentType(response.response);
    }

    const handleGetCivilStatus = async () => {
        const response = await getCivilStatus();
        setEstadoCivilList(response.response)
    }

    useEffect(() => {
        if (openModalDataPersonal) {
            handleGetPersonalInformation();
            handleGetCountries();
            handleGetTypesDocument();
            handleGetCivilStatus();
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
                            value={nameCandidate}
                            margin="normal"
                            fullWidth
                            {...register("nombre", { required: false })}
                            onChange={(e) => setNameCandidate(e.target.value)}
                        />
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            value={lastNameCandidate}
                            margin="normal"
                            fullWidth
                            {...register("apellidos", { required: false })}
                            onChange={(e) => setLastNameCandidate(e.target.value)}
                        />
                        <Autocomplete
                            fullWidth
                            options={countriesList}
                            getOptionLabel={(option) => option.name}
                            value={countriesList.find(country => country.id === countryCandidateId) || null}
                            onChange={(_event, newValue) => {
                                setCountryCandidateId(newValue?.id || '');
                                setValue('pais', newValue?.id || '');
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="País"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            )}
                        />

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
                            value={phoneCandidate}
                            sx={{
                                width: "60%",
                            }}
                            //value={nacionalidadCandidate}
                            fullWidth
                            {...register("numero", { required: false })}
                            onChange={(e) => setPhoneCandidate(e.target.value)}
                        />
                        <TextField
                            label="Dirección"
                            variant="outlined"
                            margin="normal"
                            value={addressCandidate}
                            fullWidth
                            {...register("direccion", { required: false })}
                            onChange={(e) => setAddressCandidate(e.target.value)}
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
                                    value={dayId !== null ? dayId as DayOption : ''}
                                    onChange={(_event, newValue) => setDayId(Number(newValue))}
                                    getOptionLabel={(option) => String(option)}
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
                                    value={monthId !== null ? months.find(m => m.id === monthId) : { id: Number(), name: '' }}
                                    onChange={(_event, newValue) => {
                                        setMonthId(newValue?.id || null);
                                        //setMonth(newValue?.id || null); // También actualiza el estado del mes seleccionado
                                    }}
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
                                <Autocomplete
                                    sx={{ width: "70%" }}
                                    disableClearable
                                    options={years}
                                    value={yearId !== null ? years.find(year => year === yearId) || '' : ''}
                                    onChange={(_event, newValue: YearOption | null) => setYearId(newValue !== null ? Number(newValue) : null)}
                                    getOptionLabel={(option: YearOption) => String(option)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Año"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Box>
                            <Autocomplete
                                fullWidth
                                options={estadoCivilList}
                                getOptionLabel={(option) => option.name}
                                value={estadoCivilList.find(ec => ec.id === optionCivilStatus) || null}
                                onChange={(_event, newValue) => {
                                    setOptionCivilStatus(newValue?.id || '');
                                    setValue('estadoCivil', newValue?.name || '');
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
                            />

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "1rem",
                        }}
                    >
                        <Autocomplete
                            fullWidth
                            options={dataDocumentType}
                            getOptionLabel={(option) => option.name}
                            value={dataDocumentType.find((td: any) => td.id === typeDocumentId) || null}
                            onChange={(_event, newValue) => {
                                //setSelectedOptionDocumentTypeId(newValue?.id);
                                setTypeDocumentId(newValue?.id);
                                setValue('tipoDocumento', newValue?.id);
                                //clearErrors('documento');
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
                        />
                        <TextField
                            label="Documento"
                            variant="outlined"
                            margin="normal"
                            value={dniCandidate}
                            // disabled={!selectedOptionDocumentTypeId}
                            fullWidth
                            {...register("documento", { required: false })}
                            onChange={(e) => setDniCandidate(e.target.value)}
                        />
                    </Box>
                    <TextField
                        multiline
                        rows={6}
                        label="Descripción de perfil"
                        variant="outlined"
                        fullWidth
                        value={descriptionProfileCandidate}
                        {...register("descripcionPerfil", { required: false })}
                        onChange={(e) => setDescriptionProfileCandidate(e.target.value)}
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