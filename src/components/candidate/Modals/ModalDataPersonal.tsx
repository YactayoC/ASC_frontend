import { Autocomplete, Box, Button, Divider, FormControl, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import theme from "../../../../theme";
import { useEffect, useState } from "react";
import useAccount from '../../../hooks/Candidate/Account/useAccount';
import { isValid, parse } from 'date-fns';

const ModalDataPersonal = (props: { openModalDataPersonal: boolean, handleCloseModalEditDataPersonal: () => void }) => {
    const { openModalDataPersonal, handleCloseModalEditDataPersonal } = props;
    const { getPersonalInformation, updatePersonalinformation } = useAccount();
    const userInfo = localStorage.getItem("userInfo");
    const userInfoJson = JSON.parse(userInfo || "{}");
    //NO CONSIDERAR
    const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm();

    const [selectedOptionCivilStatus, setSelectedOptionCivilStatus] = useState<any | null>(null); // ID ESTADO CIVIL
    const [optionCivilStatus, setOptionCivilStatus] = useState('');
    //----
    const [selectedOptionDocumentType, setSelectedOptionDocumentType] = useState<any | null>(null); // ID  TIPO DOCUMENTO

    const [nacionalidadCandidate, setNacionalidadCandidate] = useState('');
    const [dniCandidate, setDniCandidate] = useState('');
    const [nombreCandidate, setNombreCandidate] = useState('');
    const [apellidosCandidate, setApellidosCandidate] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleGetPersonalInfo = async () => {
        const { response } = await getPersonalInformation(userInfoJson?.id_user);

        if (response) {
            const dataInfo = response.data;
            console.log(dataInfo)

            const fechaNacimiento = new Date(dataInfo.fecha_nacimiento);
            const dayInfo = ("0" + fechaNacimiento.getDate()).slice(-2); // Asegura el formato de dos dígitos
            const monthInfo = ("0" + (fechaNacimiento.getMonth() + 1)).slice(-2); // Meses son de 0 a 11
            const yearInfo = fechaNacimiento.getFullYear().toString();

            //setNacionalidadCandidate(dataInfo.nacionalidad);
            setOptionCivilStatus(dataInfo.estado_civil);
            setDniCandidate(dataInfo.documento);
            setNombreCandidate(dataInfo.nombre);
            setApellidosCandidate(dataInfo.apellidos);
            setDay(dayInfo);
            setMonth(monthInfo);
            setYear(yearInfo);

            const estadoCivilObj = estadoCivil.find(ec => ec.label === dataInfo.estado_civil);
            if (estadoCivilObj) {
                console.log(estadoCivilObj.label);
            }
            const tipoDocumentoObj = tipoDocumento.find(td => td.value === dataInfo.tipo_documento_id);
            if (tipoDocumentoObj) {
                console.log(tipoDocumentoObj.value);
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

        if (selectedOptionDocumentType === 1 && (!data.documento || data.documento.trim() === '')) {
            setError('documento', {
                type: 'manual',
                message: 'El campo Documento es requerido.',
            });
            return; // Previene el envío si el campo documento es requerido y está vacío
        }
        if (!selectedOptionDocumentType || data.documento.trim() === '') {
            data.documento = null;
        }

        console.log(data);
        console.log(selectedOptionCivilStatus);
        console.log(selectedOptionDocumentType);
        console.log(data.documento);
        console.log(data.fechaNacimiento);
        console.log(data.nacionalidad);
        console.log(data.apellidos);
        console.log(data.nombre);
        console.log(data.tipoDocumento);
        console.log(data.estadoCivil);
        console.log(userInfoJson?.id_user)

        // const response = await updatePersonalinformation(
        //     userInfoJson?.id_user,
        //     data.nombre,
        //     data.apellidos,
        //     data.fechaNacimiento,
        //     selectedOptionCivilStatus,
        //     selectedOptionDocumentType,
        //     data.documento || null
        // );

        // if (response) {
        //     console.log(response);
        //     // Actualiza la información del usuario en el localStorage
        //     const updatedUserInfo = {
        //         ...userInfoJson,
        //         nombresC: data.nombre,
        //         apellidosC: data.apellidos
        //     };

        //     localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        // }
    }

    const handleClose = () => {
        handleCloseModalEditDataPersonal();
        clearErrors(['fechaNacimiento']);
        setDay('');
        setMonth('');
        setYear('');
        reset()
    };

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
        if (day && month && year && isValid(birthdate)) {
            setValue('fechaNacimiento', birthdateStr);
            clearErrors('fechaNacimiento');
        } else if (day && month && year) {
            setError('fechaNacimiento', {
                type: "manual",
                message: "Fecha de nacimiento no válida",
            });
        }

        if (day === '' && month === '' && year === '') {
            setValue('fechaNacimiento', '');
            clearErrors('fechaNacimiento');
        }

    }, [day, month, year, setValue, setError, clearErrors]);

    const years = [
        '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
        '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022', '2023', '2024'
    ]

    const months = [
        { value: '01', label: 'Enero' },
        { value: '02', label: 'Febrero' },
        { value: '03', label: 'Marzo' },
        { value: '04', label: 'Abril' },
        { value: '05', label: 'Mayo' },
        { value: '06', label: 'Junio' },
        { value: '07', label: 'Julio' },
        { value: '08', label: 'Agosto' },
        { value: '09', label: 'Septiembre' },
        { value: '10', label: 'Octubre' },
        { value: '11', label: 'Noviembre' },
        { value: '12', label: 'Diciembre' }
    ]

    const dayF = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31'
    ]

    const estadoCivil = [
        { value: 1, label: 'Soltero' },
        { value: 2, label: 'Viudo' },
        { value: 3, label: 'Casado' },
    ]

    const tipoDocumento = [
        { value: 1, label: 'DNI' },
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
                    [theme.breakpoints.down("sm")]: {
                        width: "95%",
                        padding: "1rem",
                        paddingBlock: "2rem",
                    },
                }}
            >
                <Typography variant="h6" id="modal-title" gutterBottom align="left">
                    Datos personal y de contacto
                </Typography>
                <Divider />
                <FormControl
                    component={"form"}
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
                            {...register("nombre", { required: true })}
                        />
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            value={apellidosCandidate}
                            margin="normal"
                            fullWidth
                            {...register("apellidos", { required: true })}
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
                                columnGap: "3rem",
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
                                    flexDirection: "column",
                                    width: "100%",
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
                                        fullWidth
                                        disableClearable
                                        options={dayF}
                                        value={day}
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
                                        value={{ value: month, label: month }}
                                        onChange={(_event, newValue) => setMonth(newValue.value)}
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
                                        fullWidth
                                        disableClearable
                                        options={years}
                                        value={year}
                                        onChange={(_event, newValue) => setYear(String(newValue))}
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
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    columnGap: "1rem",
                                }}
                            >
                                <Autocomplete
                                    fullWidth
                                    options={estadoCivil}
                                    value={optionCivilStatus ? { value: Number(), label: optionCivilStatus } : null}
                                    onChange={(_event, value) => {
                                        setSelectedOptionCivilStatus(value?.label)
                                        setValue('estadoCivil', value?.value);
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
                            value={selectedOptionDocumentType ? { value: selectedOptionDocumentType, label: 'DNI' } : null}
                            options={tipoDocumento}
                            onChange={(_event, value) => {
                                setSelectedOptionDocumentType(value?.value)
                                setValue('tipoDocumento', value?.value);
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
                            value={dniCandidate}
                            disabled={!selectedOptionDocumentType}
                            fullWidth
                            {...register("documento", { required: false })}
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

export default ModalDataPersonal;