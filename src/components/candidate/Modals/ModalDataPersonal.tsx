import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import theme from "../../../../theme";
import { useEffect, useState } from "react";
import useAccount from '../../../hooks/Candidate/Account/useAccount';
import { isValid, parse } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';

const ModalDataPersonal = (props: { openModalDataPersonal: boolean, handleCloseModalEditDataPersonal: () => void }) => {
    const { openModalDataPersonal, handleCloseModalEditDataPersonal } = props;
    const { getPersonalInformation, updatePersonalinformation, getTypesDocument } = useAccount();
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    const [initialFormValues, setInitialFormValues] = useState<any>({});
    const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm();

    const [optionCivilStatus, setOptionCivilStatus] = useState('');//AGARRA EL OBJECT
    //----
    const [selectedOptionDocumentType, setSelectedOptionDocumentType] = useState(''); //AGARRA EL OBJECT
    //----
    const [selectedOptionDocumentTypeId, setSelectedOptionDocumentTypeId] = useState(''); //AGARRA EL OBJECT

    const [nacionalidadCandidate, setNacionalidadCandidate] = useState('');
    const [dniCandidate, setDniCandidate] = useState('');
    const [nombreCandidate, setNombreCandidate] = useState('');
    const [apellidosCandidate, setApellidosCandidate] = useState('');
    const [phoneCandidate, setPhoneCandidate] = useState('');
    const [addressCandidate, setAddressCandidate] = useState('');
    const [descriptionProfileCandidate, setDescriptionProfileCandidate] = useState('');
    const [dataDocumentType, setDataDocumentType] = useState<any>([]);

    const [day, setDay] = useState<any>()
    const [month, setMonth] = useState<any>();
    const [year, setYear] = useState<any>();

    const handleGetPersonalInfo = async () => {
        const { response } = await getPersonalInformation(userInfoJson?.id_user);
        const { response: responseDocumentType } = await getTypesDocument();

        setDataDocumentType(responseDocumentType.data)

        if (response) {
            const dataInfo = response.data;

            console.log(dataInfo)

            if (dataInfo.fecha_nacimiento && Date.parse(dataInfo.fecha_nacimiento)) {
                const fechaNacimiento = new Date(dataInfo.fecha_nacimiento);
                const dayInfo = new Date(fechaNacimiento).getDate()
                const monthInfo = new Date(fechaNacimiento).getMonth() + 1
                const yearInfo = new Date(fechaNacimiento).getFullYear()

                setDay(dayInfo);
                setMonth(monthInfo);
                setYear(yearInfo);

                setInitialFormValues({
                    nombre: dataInfo.nombre,
                    apellidos: dataInfo.apellidos,
                    //nacionalidad: dataInfo.nacionalidad,
                    fechaNacimiento: `${yearInfo}-${monthInfo}-${dayInfo}`,
                    estadoCivil: optionCivilStatus,
                    tipoDocumentoId: selectedOptionDocumentTypeId,
                    documento: dataInfo.documento,
                    numero: dataInfo.numero,
                    direccion: dataInfo.direccion,
                    descripcionPerfil: dataInfo.descripcion_perfil
                });

            } else {
                setDay('');
                setMonth('');
                setYear('');
            }

            //setNacionalidadCandidate(dataInfo.nacionalidad);
            setOptionCivilStatus(dataInfo.estado_civil);
            setDniCandidate(dataInfo.documento);
            setPhoneCandidate(dataInfo.numero);
            setAddressCandidate(dataInfo.direccion);
            setDescriptionProfileCandidate(dataInfo.descripcion_perfil);
            setNombreCandidate(dataInfo.nombre);
            setApellidosCandidate(dataInfo.apellidos);

            const estadoCivilObj = estadoCivil.find(ec => ec.label === dataInfo.estado_civil);
            if (estadoCivilObj) {
                setOptionCivilStatus(estadoCivilObj.label);
            }

            const tipoDocumentoObj = responseDocumentType.data.find((td: any) => td.id === dataInfo.tipo_documento_id);
            if (tipoDocumentoObj) {
                setSelectedOptionDocumentTypeId(tipoDocumentoObj.id);
            }

            //QUIERO QUE SELECCIONE EL PRIME ELEMENTO DE NACIONALIDAD
            const nationalityObj = nationality.find(n => n.value === 1);
            if (nationalityObj) {
                setNacionalidadCandidate(nationalityObj.label);
            }
        }
    }

    const onSubmitPersonalData = async (data: any) => {
        //handleCloseModalEditDataPersonal();
        //REALIZAR LA PETICION
        if (!day || !month || !year) {
            // Si algún campo está vacío, muestra un error y no continúes
            setError('fechaNacimiento', {
                type: 'manual',
                message: 'Todos los campos de la fecha de nacimiento son requeridos.',
            });
            return;
        }

        const fechaNacimientoDateFormat = `${year}-${month}-${day}`;



        const hasChanged = data.nombre !== initialFormValues.nombre ||
            data.apellidos !== initialFormValues.apellidos ||
            // data.nacionalidad !== initialFormValues.nacionalidad ||
            fechaNacimientoDateFormat !== initialFormValues.fechaNacimiento ||
            optionCivilStatus !== initialFormValues.estadoCivil ||
            selectedOptionDocumentTypeId !== initialFormValues.tipoDocumentoId ||
            data.documento !== initialFormValues.documento ||
            phoneCandidate !== initialFormValues.numero ||
            addressCandidate !== initialFormValues.direccion ||
            descriptionProfileCandidate !== initialFormValues.descripcionPerfil;

        if (selectedOptionDocumentTypeId && (!data.documento || data.documento.trim() === '')) {
            setError('documento', {
                type: 'manual',
                message: 'El campo Documento es requerido.',
            });
            return; // Previene el envío si el campo documento es requerido y está vacío
        }

        if (!selectedOptionDocumentType || data.documento.trim() === '') {
            data.documento = null;
        }

        if (!hasChanged) {
            //console.log("no se detectaron cambios")
            return;
        }

        //APLICA UN FORMAt format('yyyy-MM-dd');
        const response = await updatePersonalinformation(
            userInfoJson?.id_user,
            data.nombre,
            data.apellidos,
            fechaNacimientoDateFormat,
            optionCivilStatus,
            Number(selectedOptionDocumentTypeId),
            dniCandidate,
            descriptionProfileCandidate,
            phoneCandidate,
            addressCandidate
        );

        if (response) {
            console.log(response);

            const updatedUserInfo = {
                ...userInfoJson,
                nombresC: data.nombre,
                apellidosC: data.apellidos
            };

            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            window.location.reload();
        }
    }

    const handleClose = () => {
        handleCloseModalEditDataPersonal();
        clearErrors(['fechaNacimiento']);
        setSelectedOptionDocumentType('');
        setSelectedOptionDocumentTypeId('');
        setDay('');
        setPhoneCandidate('');
        setMonth('');
        setYear('');
        reset()
    };

    useEffect(() => {
        setValue('nombre', nombreCandidate);
        setValue('apellidos', apellidosCandidate);
        setValue('nacionalidad', nacionalidadCandidate);
        setValue('fechaNacimiento', `${day}-${month}-${year}`);
        setValue('estadoCivil', optionCivilStatus);
        setValue('tipoDocumento', selectedOptionDocumentType);
        setValue('documento', dniCandidate);

    }, [nombreCandidate, apellidosCandidate, nacionalidadCandidate, day, month, year, optionCivilStatus, selectedOptionDocumentType, dniCandidate, setValue]);

    useEffect(() => {
        if (openModalDataPersonal) {
            handleGetPersonalInfo();
        }
    }, [openModalDataPersonal]);

    useEffect(() => {
        // Intenta construir una fecha con los valores seleccionados
        const birthdateStr = `${day}-${month}-${year}`;
        const birthdate = parse(birthdateStr, 'dd-MM-yyyy', new Date());

        // Verifica si la fecha construida es válida
        if ((day === '' || month === '') && year !== '') {
            setError('fechaNacimiento', {
                type: "manual",
                message: "Debe completar el día y el mes para registrar una fecha de nacimiento válida.",
            });
        }
        else if (isValid(birthdate)) {
            setValue('fechaNacimiento', birthdateStr);
            clearErrors('fechaNacimiento');
        }
        else if (day === '' && month === '' && year === '') {
            setValue('fechaNacimiento', '');
            clearErrors('fechaNacimiento');
        }
        else {
            setError('fechaNacimiento', {
                type: "manual",
                message: "Fecha de nacimiento no válida",
            });
        }

    }, [day, month, year, setValue, setError, clearErrors]);

    const years = [
        '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
        '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022', '2023', '2024'
    ]

    const months = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
    ]

    const dayF = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31'
    ]

    const estadoCivil = [
        { value: 1, label: 'Soltero' },
        { value: 2, label: 'Viudo' },
        { value: 3, label: 'Casado' },
    ]

    const nationality = [
        { value: 1, label: 'Peruano(a)' }
    ]

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
                            value={nombreCandidate}
                            margin="normal"
                            fullWidth
                            {...register("nombre", { required: false })}
                            onChange={(e) => setNombreCandidate(e.target.value)}
                        />
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            value={apellidosCandidate}
                            margin="normal"
                            fullWidth
                            {...register("apellidos", { required: false })}
                            onChange={(e) => setApellidosCandidate(e.target.value)}
                        />
                        <Autocomplete
                            fullWidth
                            disableClearable
                            options={nationality}
                            value={{ value: 1, label: nacionalidadCandidate }}
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
                            {...register("celular", { required: false })}
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
                                    sx={{
                                        width: "20%",
                                    }}
                                    disableClearable
                                    options={dayF}
                                    value={String(
                                        day < 10 ? `0${day}` : `${day}`
                                    )}
                                    onChange={(_event, newValue) => setDay(newValue)}
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
                                    value={months.find(m => m.value === Number(month)) || { value: 0, label: '' }}
                                    onChange={(_event, newValue) => setMonth(newValue.value || '')}
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

                                />
                            </Box>
                            <Autocomplete
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
                        />
                        <TextField
                            label="Documento"
                            variant="outlined"
                            margin="normal"
                            value={dniCandidate || ""}
                            disabled={!selectedOptionDocumentTypeId}
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
    );
}

export default ModalDataPersonal;