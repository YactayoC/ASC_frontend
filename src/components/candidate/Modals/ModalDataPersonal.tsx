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
    const [selectedOptionDocumentType, setSelectedOptionDocumentType] = useState<any | null>(null);
    const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm();

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleGetPersonalInfo = async () => {
        const response = await getPersonalInformation(userInfoJson?.id_user);
        if (response && response.response) {
            const data = response.response.data;
            console.log(response.response.data)
            setValue('nombre', data.nombre);
            setValue('apellidos', data.apellidos);
        }
    }

    const onSubmitPersonalData = async (data: any) => {
        handleCloseModalEditDataPersonal();
        //REALIZAR LA PETICION
        const response = await updatePersonalinformation(
            userInfoJson?.id_user,
            data.nombre,
            data.apellidos,
            data.fechaNacimiento,
            data.estadoCivil,
            data.tipoDocumento,
            data.documento
        );

        if (response) {
            console.log(response);
        }
    }

    const handleClose = () => {
        handleCloseModalEditDataPersonal();
        clearErrors(['fechaNacimiento']);
        setDay('');
        setMonth('');
        setYear('');
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
                            margin="normal"
                            fullWidth
                            defaultValue={userInfoJson?.nombresC}
                            {...register("nombre", { required: true })}
                        />
                        <TextField
                            label="Apellidos"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            defaultValue={userInfoJson?.apellidosC}
                            {...register("apellidos", { required: true })}
                        />
                        <Autocomplete
                            fullWidth
                            disableClearable
                            options={['Peruano(a)']}
                            defaultValue="Peruano(a)"
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
                                    onChange={(_event, value) => {
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
                            options={tipoDocumento}
                            onChange={(_event, value) => {
                                setSelectedOptionDocumentType(value?.label)
                                setValue('tipoDocumento', value?.value);
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
                            disabled={!selectedOptionDocumentType}
                            fullWidth
                            {...register("documento", { required: true })}
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