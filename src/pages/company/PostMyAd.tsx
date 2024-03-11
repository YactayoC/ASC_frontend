import HeaderButtons from "../../components/candidate/HeaderButtons";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import React, { useEffect, useState } from "react";
import {
    Box,
    Tab,
    Tabs,
    FormControlLabel,
    Checkbox,
    TextField,
    Autocomplete,
    Button,
    RadioGroup,
    Radio,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Snackbar,
    Alert
} from "@mui/material";

import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Add, Facebook, Twitter, LinkedIn, Delete, Edit } from "@mui/icons-material";

import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchJob from "../../components/common/SearchJob";
import theme from "../../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import ModalDataStudies from "../../components/candidate/Modals/ModalDataStudies";
import ModalDataLanguage from "../../components/candidate/Modals/ModalDataLanguage";

const PostMyAd = () => {


    const [openModalStudy, setOpenModalStudy] = useState(false);
    const [openModalLanguage, setOpenModalLanguage] = useState(false);
    const [tabValueHorizontal, setTabValueHorizontal] = useState(0);
    const [tabValueVertical, setTabValueVertical] = useState(0);
    const [tabSubValueVertical, setSubTabValueVertical] = useState(0);
    const [preview, setPreview] = useState(true);
    const [alignment, setAlignment] = useState('inscritos');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [enlace, setEnlace] = useState('');
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [preguntaAbiertas, setPreguntaAbiertas] = useState<PreguntaAbierta[]>([]);
    const [selectComboBox, setSelectComboBox] = useState('' as string);
    const [openBar, setOpenBar] = useState(false);

    //ABRIR / CERRAR SNACKBAR
    const handleClick = () => {
        setOpenBar(true);
    };

    const handleCloseSnackBar = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenBar(false);
    };

    //INSERTAR PREGUNTAS CERRADAS CON RESPUESTAS DINAMICAS
    const handleQuestionCloseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, preguntaIndex: number) => {
        const newPreguntas = [...preguntas];
        newPreguntas[preguntaIndex].pregunta = event.target.value;
        setPreguntas(newPreguntas);
    };

    const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, preguntaIndex: number, respuestaIndex: number) => {
        const newPreguntas = [...preguntas];
        newPreguntas[preguntaIndex].respuestas[respuestaIndex].respuesta = event.target.value;
        setPreguntas(newPreguntas);
    };

    const handlePesoChange = (value: string | null, preguntaIndex: number, respuestaIndex: number) => {
        if (value !== null) {
            const newPreguntas = [...preguntas];
            newPreguntas[preguntaIndex].respuestas[respuestaIndex].peso = value;
            setPreguntas(newPreguntas);
        }
    };

    const handleRemoveRespuesta = (preguntaIndex: number, respuestaIndex: number) => {
        const newPreguntas = [...preguntas];
        // Verifica si es la última pregunta y si tiene una sola respuesta
        if (newPreguntas.length === 1 && newPreguntas[preguntaIndex].respuestas.length === 1) {
            return
        } else {
            newPreguntas[preguntaIndex].respuestas.splice(respuestaIndex, 1);
            if (newPreguntas[preguntaIndex].respuestas.length === 0) {
                newPreguntas.splice(preguntaIndex, 1);
            }
            setPreguntas(newPreguntas);
        }
    };

    const handleAddResponse = (preguntaIndex: number) => {
        const newRespuesta: Respuesta = { id: Date.now(), respuesta: '', peso: '' };
        const newPreguntas = [...preguntas];
        newPreguntas[preguntaIndex].respuestas.push(newRespuesta);
        setPreguntas(newPreguntas);
    };

    const handleAddClosedQuestion = () => {
        if (preguntas.length < 20) { // Verifica si ya hay menos de 20 preguntas cerradas
            const newQuestion: Pregunta = {
                id: Date.now(), // Asegúrate de que este ID sea único
                pregunta: '',
                respuestas: [{ id: Date.now(), respuesta: '', peso: '' }] // Agregar una respuesta inicial vacía
            };
            setPreguntas([...preguntas, newQuestion]);
        } else {
            handleClick();
        }
    };

    //PREGUNTAS ABIERTAS
    const handleAddQuestionOpen = () => {
        if (preguntaAbiertas.length < 20) { // Verifica si ya hay menos de 20 preguntas abiertas
            const newQuestion: PreguntaAbierta = {
                id: Date.now(), // Asegúrate de que este ID sea único
                pregunta: '',
            };
            setPreguntaAbiertas([...preguntaAbiertas, newQuestion]);
        } else {
            handleClick();
        }
    };

    const handleRemoveClosedQuestion = (preguntaIndex: number) => {
        if (preguntaAbiertas.length === 1) {
            return
        }
        setPreguntaAbiertas(prevPreguntas => prevPreguntas.filter((_, index) => index !== preguntaIndex));
    };

    const handleQuestionOpenChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, preguntaIndex: number) => {
        const newPreguntas = [...preguntaAbiertas];
        newPreguntas[preguntaIndex].pregunta = event.target.value;
        setPreguntaAbiertas(newPreguntas);
    }

    const open = Boolean(anchorEl);

    const isXXXLDown = useMediaQuery(theme.breakpoints.down('xxxl'));

    const handleChangeToogle = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
    };

    const handleChange = (_e: any, newValue: number) => {
        setTabValueHorizontal(newValue);
        if (newValue !== 2) { // Si no es la pestaña "Cuestionario de preguntas"
            setSelectComboBox(''); // Restablece el selectComboBox
            setPreguntas([]); // Restablece las preguntas
        }
    };

    const handleCloseModalEditDataStudies = () => {
        setOpenModalStudy(false);
    }

    const handleCloseModalEditDataLanguage = () => {
        setOpenModalLanguage(false);
    }

    const handleChangeVertical = (_e: any, newValue: number) => {
        setTabValueVertical(newValue);
        setPreguntaAbiertas([]);
        setPreguntas([]);
    };

    const handleChangeTabSubVertical = (_e: any, newValue: number) => {
        setSubTabValueVertical(newValue);
    };

    const handleChangePreview = () => {
        setPreview(!preview);
    }

    const handleClickMoreOptions = (event: { currentTarget: any; }) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnlace(event.target.value);
    };

    const handleCopyTextField = async () => {
        try {
            await navigator.clipboard.writeText(enlace);
            //alert('Enlace copiado al portapapeles!');
        } catch (err) {
            console.error('Error al copiar enlace: ', err);
            //alert('Error al copiar el enlace.');
        }
    }

    const handleSelectComboBox = (_event: React.ChangeEvent<{}>, value: string | null) => {
        if (value) {
            setSelectComboBox(value);
            setPreguntas([
                {
                    id: Date.now(),
                    pregunta: '',
                    respuestas: [{ id: Date.now(), respuesta: '', peso: '' }]
                }
            ]);
            setPreguntaAbiertas([
                {
                    id: Date.now(),
                    pregunta: '',
                }
            ]);
        }
    };

    const sectorCompany = [
        { label: "Tecnología" },
        { label: "Salud" },
        { label: "Educación" },
        { label: "Finanzas" },
        { label: "Recursos Humanos" },
        { label: "Ventas" },
        { label: "Marketing" },
        { label: "Diseño" },
        { label: "Ingeniería" },
        { label: "Otro" },
    ];

    const questionType = [
        { label: "Cerrada" },
        { label: "Abierta" },
    ];


    const questionWeight = [
        { label: "0" },
        { label: "1" },
    ];

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const options = [
        { id: 0, label: "Datos del aviso" },
        { id: 1, label: "Datos de la publicación" },
        { id: 2, label: "Proceso de selección" },
    ];

    useEffect(() => {
        let timer: any;
        if (openBar) {
            // Establece un temporizador para cerrar el Snackbar después de 2 segundos
            timer = setTimeout(handleCloseSnackBar, 3000);
        }
        return () => {
            // Limpia el temporizador si el componente se desmonta o si el Snackbar se cierra antes de tiempo
            clearTimeout(timer);
        };
    }, [openBar]);

    return (
        <>
            <Box>
                <HeaderButtons showLogo={true} />
                <HeaderMainPage />
                {showSearchBar ? (

                    <Box
                        sx={{
                            width: "60%",
                            paddingTop: "3rem",
                            margin: "auto",
                        }}
                    >
                        <SearchJob />
                        <Typography sx={{
                            marginTop: "0.9rem",
                        }}>1800 perfiles encontrados</Typography>
                    </Box>
                ) : (

                    <Box
                        sx={{
                            width: "60%",
                            paddingTop: "3rem",
                            margin: "auto",
                        }}
                    >
                        <SearchJob />
                        <Typography sx={{
                            marginTop: "0.9rem",
                        }}>1800 perfiles encontrados</Typography>
                    </Box>
                )}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "3rem",
                        pt: "3rem",
                        width: "85%",
                        margin: "auto",
                        marginBottom: "4rem",
                        backgroundColor: "white",
                        paddingTop: "0",
                        marginTop: "3rem",
                        padding: "3rem",
                        borderRadius: "3rem",
                    }}
                >
                    {preview ? (
                        <>
                            <Tabs
                                value={tabValueVertical}
                                orientation="vertical"
                                onChange={handleChangeVertical}
                                sx={{
                                    marginTop: "4rem",
                                    borderRight: 1,
                                    borderColor: "divider",
                                    [theme.breakpoints.down("xxxl")]: {
                                        display: "none",
                                    }
                                }}
                            >
                                <Tab label="Datos del aviso" value={0} />
                                <Tab label="Datos de la publicación" value={1} />
                                <Tab label="Proceso de selección" value={2} />
                            </Tabs>

                            <Box sx={{ flexGrow: 1, width: "100%" }}>
                                {tabValueVertical === 0 && (
                                    <Box>
                                        {isXXXLDown && (
                                            <div>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClickMoreOptions}
                                                >
                                                    <MenuIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem key={option.label} selected={option.label === 'Pyxis'} onClick={() => {
                                                            handleClose();
                                                            setTabValueVertical(option.id);
                                                        }}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </div>
                                        )}
                                        <Tabs
                                            value={tabValueHorizontal}
                                            onChange={handleChange}
                                            aria-label="Horizontal tabs example"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            allowScrollButtonsMobile
                                            sx={{
                                                borderBottom: 1,
                                                borderColor: "divider",
                                            }}
                                        >
                                            <Tab label="Perfil de puesto" value={0} />
                                            <Tab onClick={() => {
                                                setShowSearchBar(false)
                                            }} label="Requisitos" value={1} />
                                            <Tab label="Cuestionario de preguntas" value={2} />
                                        </Tabs>

                                        {tabValueHorizontal === 0 && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    rowGap: "2.1rem",
                                                    paddingTop: "1rem",
                                                    width: "auto",
                                                    [theme.breakpoints.down("lg")]: {
                                                        paddingRight: "0",
                                                        rowGap: "1rem",
                                                    },
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={<Checkbox name="hideCompanyName" />}
                                                    label="Ocultar el nombre de la empresa"
                                                    sx={{
                                                        alignSelf: "flex-end",
                                                        [theme.breakpoints.down("lg")]: {
                                                            alignSelf: "flex-start",
                                                        }
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "2rem",
                                                        justifyContent: "space-between",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                        }
                                                    }}
                                                >
                                                    <TextField
                                                        label="Nombre de la empresa"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={sectorCompany}
                                                        sx={{
                                                            width: "20rem",
                                                            [theme.breakpoints.down("lg")]: {
                                                                width: "100%",
                                                            }
                                                        }}

                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Área" />
                                                        )}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "2rem",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                        }
                                                    }}
                                                >
                                                    <TextField
                                                        label="Número de vacantes"
                                                        type="number"
                                                        fullWidth
                                                    />
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Fecha de contratación"
                                                            sx={{
                                                                width: "30rem",
                                                                [theme.breakpoints.down("lg")]: {
                                                                    width: "100%",

                                                                }
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={sectorCompany}
                                                        sx={{
                                                            width: "30rem",
                                                            [theme.breakpoints.down("lg")]: {
                                                                width: "100%",
                                                            }
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Modalidad de trabajo" />
                                                        )}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "2rem",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                        }
                                                    }}
                                                >
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={sectorCompany}
                                                        sx={{
                                                            width: "20rem",
                                                            [theme.breakpoints.down("lg")]: {
                                                                width: "100%",
                                                            }
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Tipo de Jornada" />
                                                        )}
                                                    />
                                                    <Typography sx={{
                                                        [theme.breakpoints.down("lg")]: {
                                                            width: "100%",
                                                            textAlign: "left",
                                                        }
                                                    }} >Rango salarial</Typography>
                                                    <TextField label="Desde" sx={{
                                                        [theme.breakpoints.down("lg")]: {
                                                            width: "100%",
                                                        }
                                                    }} />
                                                    <TextField label="Hasta" sx={{
                                                        [theme.breakpoints.down("lg")]: {
                                                            width: "100%",
                                                        }
                                                    }} />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Ocultar salario"
                                                        sx={{
                                                            alignSelf: "flex-end",
                                                            [theme.breakpoints.down("lg")]: {
                                                                alignSelf: "flex-start",
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        rowGap: "1rem",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "1.1rem",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Ubicación
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            columnGap: "2rem",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            [theme.breakpoints.down("lg")]: {
                                                                flexDirection: "column",
                                                                rowGap: "1rem",
                                                            }
                                                        }}
                                                    >
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={sectorCompany}
                                                            fullWidth
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Departamnento" />
                                                            )}
                                                        />
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={sectorCompany}
                                                            fullWidth
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Provincia" />
                                                            )}
                                                        />
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={sectorCompany}
                                                            fullWidth
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Distrito" />
                                                            )}
                                                        />
                                                    </Box>
                                                </Box>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Descripción del anuncio"
                                                    multiline
                                                    rows={7}
                                                />
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        width: "10rem",
                                                        alignSelf: "flex-end",
                                                        [theme.breakpoints.down("lg")]: {
                                                            width: "100%",
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        setTabValueHorizontal(1);
                                                    }}

                                                >
                                                    Siguiente
                                                </Button>
                                            </Box>
                                        )}

                                        {tabValueHorizontal === 1 && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    rowGap: "2rem",
                                                    paddingTop: "1rem",
                                                    width: "100%",

                                                    [theme.breakpoints.down("mddd")]: {
                                                        paddingRight: "2rem",
                                                    }
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={<Checkbox name="hideCompanyName" />}
                                                    label="Aviso para personas con discapacidad"
                                                    sx={{
                                                        marginBottom: "-1.5rem",
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        columnGap: "1.2rem",
                                                        width: "100%",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                            paddingLeft: "3rem",
                                                        },
                                                        [theme.breakpoints.down("md")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                            paddingLeft: "3rem",
                                                        }
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Auditiva"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Deficiencia Psicosocial"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Mental"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Sensorial"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Auditiva"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Visual"
                                                    />
                                                </Box>

                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Descripción"
                                                    multiline
                                                    rows={5}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: "1.1rem",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Rango de edad
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "2rem",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                        }
                                                    }}
                                                >
                                                    <TextField label="Mínimo" variant="outlined" fullWidth />

                                                    <TextField label="Máximo" variant="outlined" fullWidth />
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={sectorCompany}
                                                        fullWidth
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Género" />
                                                        )}
                                                    />

                                                    <TextField
                                                        label="Tiempo de experiencia"
                                                        variant="outlined"
                                                        type="number"
                                                        fullWidth
                                                    />
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={sectorCompany}
                                                        fullWidth
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Nivel de educación" />
                                                        )}
                                                    />
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "1.1rem",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Formación complementaria (Opcional)
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "10rem",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                        },
                                                    }}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<Add />}
                                                        onClick={() => setOpenModalStudy(true)}
                                                        sx={{
                                                            alignSelf: "center",
                                                            [theme.breakpoints.down("lg")]: {
                                                                alignSelf: "flex-start",
                                                                width: "100%",
                                                            }
                                                        }}
                                                    >
                                                        Incluir estudios
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<Add />}
                                                        onClick={() => setOpenModalLanguage(true)}
                                                    >
                                                        Idiomas (Opcional)
                                                    </Button>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "2rem",
                                                        alignItems: "center",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                            alignItems: "flex-start",
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "1.1rem",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Habilidades (Opcional)
                                                    </Typography>

                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<Add />}
                                                        sx={{
                                                            [theme.breakpoints.down("lg")]: {
                                                                width: "100%",
                                                            }
                                                        }}
                                                    >
                                                        Agregar habilidades
                                                    </Button>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        columnGap: "2rem",
                                                        alignItems: "center",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                            alignItems: "flex-start",
                                                        },
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Licencia de conducir"
                                                    />
                                                    <TextField
                                                        label="Ingresar tipo de licencia"
                                                        variant="outlined"
                                                        sx={{
                                                            width: "20rem",
                                                            [theme.breakpoints.down("lg")]: {
                                                                width: "100%",
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        columnGap: "1.2rem",
                                                        [theme.breakpoints.down("lg")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                        },
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Vehículo propio"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Disponibilidad para viajar"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="Disponibilidad para cambiar de residencia"
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        columnGap: "1.2rem",
                                                        justifyContent: "flex-end",
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: "10rem",
                                                            alignSelf: "flex-end",
                                                        }}
                                                        onClick={() => {
                                                            setTabValueHorizontal(0);
                                                        }}
                                                    >
                                                        Retroceder
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: "10rem",
                                                            alignSelf: "flex-end",
                                                        }}
                                                        onClick={() => {
                                                            setTabValueHorizontal(2);
                                                        }}
                                                    >
                                                        Siguiente
                                                    </Button>
                                                </Box>
                                            </Box>
                                        )}
                                        {tabValueHorizontal === 2 && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    rowGap: "2rem",
                                                    paddingTop: "2rem",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            flexDirection: "column",
                                                            justifyContent: "flex-end",
                                                            rowGap: "1rem",
                                                        }
                                                    }}
                                                >
                                                    <Autocomplete
                                                        disablePortal
                                                        disableClearable
                                                        id="combo-box-demo"
                                                        options={questionType}
                                                        onInputChange={handleSelectComboBox}
                                                        sx={{
                                                            width: "20rem",
                                                            [theme.breakpoints.down("lg")]: {
                                                                width: "100%",
                                                            }
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Tipo de pregunta" />
                                                        )}
                                                    />
                                                    {selectComboBox === "Cerrada" && (
                                                        <Button
                                                            onClick={handleAddClosedQuestion}
                                                        >
                                                            Agregar pregunta
                                                        </Button>
                                                    )}
                                                </Box>

                                                {selectComboBox === "Cerrada" && preguntas.map((pregunta, preguntaIndex) => (
                                                    <TableContainer component={Paper} key={pregunta.id}>
                                                        <Table aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Pregunta / Respuestas</TableCell>
                                                                    <TableCell>Tiempo / Peso</TableCell>
                                                                    <TableCell align="right">Acciones</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {/* Fila para la pregunta */}
                                                                <TableRow>
                                                                    <TableCell component="th" scope="row">
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Pregunta"
                                                                            variant="outlined"
                                                                            value={pregunta.pregunta}
                                                                            onChange={(e) => handleQuestionCloseChange(e, preguntaIndex)}
                                                                            sx={{
                                                                                width: "30rem",
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell />
                                                                    <TableCell align="right">
                                                                        {/* Botones de acción para la pregunta */}
                                                                    </TableCell>
                                                                </TableRow>
                                                                {/* Filas para las respuestas */}
                                                                {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                                                                    <TableRow key={respuesta.id}>
                                                                        <TableCell>
                                                                            <TextField
                                                                                fullWidth
                                                                                label="Respuesta"
                                                                                variant="outlined"
                                                                                value={respuesta.respuesta}
                                                                                onChange={(e) => handleResponseChange(e, preguntaIndex, respuestaIndex)}
                                                                                sx={{ width: "20rem" }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Box
                                                                                sx={{
                                                                                    display: "flex",
                                                                                    columnGap: "1.2rem",
                                                                                    alignItems: "center",
                                                                                }}
                                                                            >
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    value={respuesta.peso}
                                                                                    onChange={(_e, newValue) => handlePesoChange(newValue, preguntaIndex, respuestaIndex)}
                                                                                    options={questionWeight.map(option => option.label)}
                                                                                    renderInput={(params) => <TextField {...params} label="Peso" />}
                                                                                    sx={{ width: "20rem" }}
                                                                                />

                                                                                <IconButton
                                                                                    onClick={() => handleAddResponse(preguntaIndex)}
                                                                                >
                                                                                    <Add />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            {/* Botones de acción para cada respuesta */}
                                                                            <IconButton>
                                                                                <Edit />
                                                                            </IconButton>
                                                                            <IconButton onClick={() => handleRemoveRespuesta(preguntaIndex, respuestaIndex)}>
                                                                                <Delete />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                        {openBar && (

                                                            <Snackbar
                                                                open={openBar}
                                                                sx={{
                                                                    width: "100%",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                }}
                                                                autoHideDuration={1000}>

                                                                <Alert

                                                                    onClose={handleCloseSnackBar}
                                                                    severity="error">
                                                                    Se permiten hasta 20 preguntas
                                                                </Alert>
                                                            </Snackbar>
                                                        )}
                                                        {/* Botón para agregar respuesta a la pregunta actual */}
                                                    </TableContainer>
                                                ))}
                                                {selectComboBox === "Abierta" && preguntaAbiertas.map((preguntaAbierta, preguntaIndex) => (
                                                    <TableContainer component={Paper} key={preguntaAbierta.id}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Pregunta</TableCell>
                                                                    <TableCell align="right">Acciones</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell component="th" scope="row">
                                                                        <TextField
                                                                            fullWidth
                                                                            label="Pregunta"
                                                                            variant="outlined"
                                                                            value={preguntaAbierta.pregunta}
                                                                            onChange={(e) => handleQuestionOpenChange(e, preguntaIndex)}
                                                                            sx={{
                                                                                width: "30rem",
                                                                            }}
                                                                        />

                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <IconButton
                                                                            onClick={() => handleAddQuestionOpen()}
                                                                        >
                                                                            <Add />
                                                                        </IconButton>
                                                                        <IconButton>
                                                                            <Edit />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            onClick={() => handleRemoveClosedQuestion(preguntaIndex)}
                                                                        >
                                                                            <Delete />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>

                                                        {openBar && (

                                                            <Snackbar
                                                                open={openBar}
                                                                sx={{
                                                                    width: "100%",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                }}
                                                                autoHideDuration={1000}>

                                                                <Alert

                                                                    onClose={handleCloseSnackBar}
                                                                    severity="error">
                                                                    Se permiten hasta 20 preguntas
                                                                </Alert>
                                                            </Snackbar>
                                                        )}
                                                    </TableContainer>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                                {tabValueVertical === 1 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            rowGap: "2.1rem",
                                            width: "auto",
                                        }}
                                    >
                                        {isXXXLDown && (
                                            <div>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClickMoreOptions}
                                                >
                                                    <MenuIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem key={option.label} selected={option.label === 'Pyxis'} onClick={() => {
                                                            handleClose();
                                                            setTabValueVertical(option.id);
                                                        }}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </div>
                                        )}

                                        <Typography
                                            sx={{
                                                fontSize: "1.8rem",
                                                fontWeight: "bold",
                                                [theme.breakpoints.down("mdd")]: {
                                                    textAlign: "center",
                                                },
                                            }}
                                        >Fechas de publicación</Typography>
                                        <FormControlLabel
                                            control={<Checkbox name="hideCompanyName" />}
                                            label="Activar la publicación y/o desactivación automática"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                columnGap: "1.6rem",
                                                width: "100%",
                                                [theme.breakpoints.down("sm")]: {
                                                    flexDirection: "column",
                                                    rowGap: "1rem",
                                                },
                                            }}
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label=""
                                                    sx={{
                                                        width: "25rem",
                                                        [theme.breakpoints.down("sm")]: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label=""
                                                    sx={{

                                                        width: "25rem",
                                                        [theme.breakpoints.down("sm")]: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>

                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize: "1.4rem",
                                                fontWeight: "bold",
                                                [theme.breakpoints.down("mdd")]: {
                                                    textAlign: "center",
                                                },
                                            }}
                                        >Datos de divulgación</Typography>

                                        <Box>
                                            <Tabs
                                                value={tabSubValueVertical}
                                                orientation="horizontal"
                                                onChange={handleChangeTabSubVertical}
                                            >
                                                <Tab label="Redes sociales" value={0} />
                                                <Tab label="Por correo electrónico" value={1} />
                                            </Tabs>
                                            {tabSubValueVertical === 0 && (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            padding: "2rem 0 2rem 5rem",
                                                            rowGap: "1.5rem",
                                                            width: "40%",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                columnGap: "1.5rem",
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "1.1rem",
                                                                    fontWeight: "bold",
                                                                }}>
                                                                Facebook
                                                            </Typography>
                                                            <Button component="label" variant="contained" startIcon={<Facebook />}
                                                                sx={{
                                                                    backgroundColor: "#3b5998",
                                                                    "&:hover": {
                                                                        backgroundColor: "#3b5998",
                                                                    }
                                                                }}>
                                                                Compartir
                                                            </Button>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                columnGap: "1.5rem",
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "1.1rem",
                                                                    fontWeight: "bold",
                                                                }}>
                                                                Twitter
                                                            </Typography>
                                                            <Button component="label" variant="contained" startIcon={<Twitter />}
                                                                sx={{
                                                                    backgroundColor: "#00acee",
                                                                    "&:hover": {
                                                                        backgroundColor: "#00acee",
                                                                    }
                                                                }}
                                                            >
                                                                Compartir
                                                            </Button>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                columnGap: "1.5rem",
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "1.1rem",
                                                                    fontWeight: "bold",
                                                                }}>
                                                                LinkedIn
                                                            </Typography>
                                                            <Button component="label" variant="contained" startIcon={<LinkedIn />}
                                                                sx={{
                                                                    backgroundColor: "#0e76a8",
                                                                    "&:hover": {
                                                                        backgroundColor: "#0e76a8",
                                                                    }
                                                                }}
                                                            >
                                                                Compartir
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                    <Box>

                                                        <Typography
                                                            sx={{
                                                                fontSize: "1.1rem",
                                                            }}>
                                                            Su posición debe ser PUBLICADA antes de que se comparta en las redes sociales.
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )}
                                            {tabSubValueVertical === 1 && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        rowGap: "2rem",
                                                        padding: "2rem 0 2rem 0",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold",
                                                        }}
                                                    >Enlace para compartir</Typography>
                                                    <Box sx={{
                                                        display: "flex",
                                                        columnGap: "1.2rem",
                                                        alignItems: "center",
                                                    }}>
                                                        <TextField
                                                            variant="outlined"
                                                            label="Enlace"
                                                            onChange={handleTextFieldChange}
                                                            sx={{
                                                                width: "70%",
                                                            }}
                                                        />
                                                        <Button component="label" variant="contained" onClick={handleCopyTextField}>
                                                            Copiar
                                                        </Button>
                                                    </Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "1.1rem",
                                                        }}>
                                                        Accederá al enlace después de haber publicado el aviso.
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold",
                                                        }}
                                                    >Publicar aviso mediante correo electrónico</Typography>
                                                    <Box sx={{
                                                        display: "flex",
                                                        columnGap: "1.2rem",
                                                        alignItems: "center",
                                                    }}>
                                                        <TextField
                                                            variant="outlined"
                                                            label="Enlace"
                                                            onChange={handleTextFieldChange}
                                                            sx={{
                                                                width: "70%",
                                                            }}
                                                        />
                                                        <Button component="label" variant="contained" onClick={handleCopyTextField}>
                                                            Guardar
                                                        </Button>
                                                        <Button component="label" variant="contained" onClick={handleCopyTextField}>
                                                            Enviar
                                                        </Button>
                                                    </Box>

                                                    <FormControlLabel
                                                        control={<Checkbox name="hideCompanyName" />}
                                                        label="¿Desea personalizar su correo electrónico?"
                                                    />

                                                    <Typography
                                                        sx={{
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold",
                                                        }}
                                                    >Editor de texto</Typography>
                                                    <TextField
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        rows={7}
                                                    />
                                                </Box>
                                            )}
                                        </Box>

                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between",
                                            [theme.breakpoints.down("lgg")]: {
                                                flexDirection: "column",
                                                rowGap: "1rem",
                                            },
                                        }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: "10rem",
                                                    [theme.breakpoints.down("lgg")]: {
                                                        width: "100%",
                                                    },
                                                }}
                                                onClick={() => {
                                                    setTabValueVertical(0);
                                                }}
                                            >
                                                Retroceder
                                            </Button>
                                            <Box sx={{
                                                display: "flex", columnGap: "1.2rem",
                                                [theme.breakpoints.down("lgg")]: {
                                                    flexDirection: "column",
                                                    rowGap: "1rem",
                                                },
                                            }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        width: "10rem",
                                                        [theme.breakpoints.down("lgg")]: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                    onClick={handleChangePreview}
                                                >
                                                    Vista previa
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        width: "10rem",
                                                        [theme.breakpoints.down("lgg")]: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                >
                                                    Publicar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        width: "10rem",
                                                        [theme.breakpoints.down("lgg")]: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setTabValueVertical(2);
                                                    }}
                                                >
                                                    Siguiente
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                                {tabValueVertical === 2 && (
                                    <>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                rowGap: "2.1rem",
                                                width: "auto",
                                                [theme.breakpoints.down("xxl")]: {
                                                    //paddingRight: "2rem",
                                                },
                                                [theme.breakpoints.down("mdd")]: {
                                                    paddingRight: "0",
                                                },
                                            }}
                                        >
                                            {isXXXLDown && (
                                                <div>
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? 'long-menu' : undefined}
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleClickMoreOptions}
                                                    >
                                                        <MenuIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        MenuListProps={{
                                                            'aria-labelledby': 'long-button',
                                                        }}
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                    >
                                                        {options.map((option) => (
                                                            <MenuItem key={option.label} selected={option.label === 'Pyxis'} onClick={() => {
                                                                handleClose();
                                                                setTabValueVertical(option.id);
                                                            }}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div>
                                            )}
                                            <Typography
                                                sx={{
                                                    fontSize: "1.8rem",
                                                    fontWeight: "bold",
                                                    [theme.breakpoints.down("mdd")]: {
                                                        textAlign: "center",
                                                    },
                                                }}
                                            >Etapas del proceso de selección</Typography>
                                            <ToggleButtonGroup
                                                color="primary"
                                                value={alignment}
                                                exclusive
                                                onChange={handleChangeToogle}
                                                aria-label="Platform"
                                                sx={{
                                                    [theme.breakpoints.down("mdd")]: {
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        textAlign: "center",
                                                    },
                                                }}
                                            >
                                                <ToggleButton
                                                    sx={{
                                                        width: "15rem",
                                                        height: "5rem",
                                                        fontSize: "1rem",
                                                    }}
                                                    value="inscritos"
                                                >
                                                    Inscritos
                                                </ToggleButton>
                                                <ToggleButton
                                                    sx={{
                                                        width: "15rem",
                                                        height: "5rem",
                                                        fontSize: "1rem",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            //width: "100%",
                                                            borderLeft: "0.8px solid rgba(0, 0, 0, 0.12) !important",
                                                        },
                                                    }}
                                                    value="descartados"
                                                >
                                                    Descartados
                                                </ToggleButton>
                                                <ToggleButton
                                                    sx={{
                                                        width: "15rem",
                                                        height: "5rem",
                                                        fontSize: "1rem",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            //width: "100%",
                                                            borderLeft: "0.8px solid rgba(0, 0, 0, 0.12) !important",
                                                        },
                                                    }}
                                                    value="finalistas"
                                                >
                                                    Finalistas
                                                </ToggleButton>
                                                <ToggleButton
                                                    sx={{
                                                        width: "15rem",
                                                        height: "5rem",
                                                        fontSize: "1rem",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            //width: "100%",
                                                            borderLeft: "0.8px solid rgba(0, 0, 0, 0.12) !important",
                                                        },
                                                    }}
                                                    value="contratados"
                                                >
                                                    Contratados
                                                </ToggleButton>
                                                <Button
                                                    variant="text"
                                                    sx={{
                                                        width: "15rem",
                                                        height: "5rem",
                                                        fontSize: "1rem",
                                                        marginLeft: "2rem",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            //width: "100%",
                                                            marginLeft: "0",
                                                            marginTop: "1rem",
                                                        },
                                                    }}
                                                >
                                                    <Box>
                                                        <Add />
                                                        <Box>Incluir carpetas</Box>
                                                    </Box>
                                                </Button>
                                            </ToggleButtonGroup>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    rowGap: "1.3rem",
                                                    width: "auto",
                                                }}
                                            >

                                                <Typography
                                                    sx={{
                                                        fontSize: "1.6rem",
                                                        fontWeight: "bold",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            textAlign: "center",
                                                        },
                                                    }}
                                                >Envio de correo automático</Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: "1.3rem",
                                                        fontWeight: "bold",
                                                        paddingLeft: "3rem",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            paddingLeft: "0",
                                                            textAlign: "center",
                                                        },
                                                    }}
                                                >Seleccione la plantilla a enviar:</Typography>
                                                <RadioGroup
                                                    row
                                                    sx={{
                                                        paddingLeft: "7rem",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            //display: "flex",
                                                            flexDirection: "column",
                                                            paddingLeft: "0",
                                                            alignContent: "center",
                                                        },
                                                    }}
                                                >
                                                    <FormControlLabel value="test" control={<Radio />} label="Pruebas Psicológica" />
                                                    <FormControlLabel value="unfit" control={<Radio />} label="No Apto" />
                                                    <FormControlLabel value="interview" control={<Radio />} label="Entrevista Presencial" />
                                                </RadioGroup>

                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Asunto del mensaje"
                                                />
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Mensaje al canditato"
                                                    multiline
                                                    rows={7}
                                                />

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        columnGap: "1.2rem",
                                                        alignItems: "center",
                                                        [theme.breakpoints.down("mdd")]: {
                                                            flexDirection: "column",
                                                            rowGap: "1rem",
                                                            alignItems: "flex-start",
                                                        },
                                                    }}
                                                >
                                                    <Button component="label" variant="contained"
                                                        sx={{
                                                            height: "4rem",
                                                            [theme.breakpoints.down("mdd")]: {
                                                                width: "100%",
                                                                alignItems: "center",
                                                            }
                                                        }}
                                                        startIcon={<CloudUploadIcon />}>
                                                        <Typography sx={{
                                                            textAlign: "center",
                                                            [theme.breakpoints.down("mdd")]: {
                                                                width: "100%",
                                                                textAlign: "center",
                                                            }

                                                        }}>Adjuntar archivo</Typography>
                                                        <VisuallyHiddenInput type="file" />
                                                    </Button>
                                                    <Typography sx={{
                                                        [theme.breakpoints.down("mdd")]: {
                                                            width: "100%",
                                                            textAlign: "center",
                                                        }
                                                    }}>Formatos de archivo permitidos: .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx, .ppt, .pptx y .pdf<br />Cada archivo puede tener un tamaño máximo de 5 MB</Typography>
                                                </Box>


                                            </Box>
                                            <Box sx={{
                                                display: "flex", justifyContent: "space-between",
                                                [theme.breakpoints.down("lgg")]: {
                                                    flexDirection: "column",
                                                    rowGap: "1rem",
                                                },
                                            }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        width: "10rem",
                                                        [theme.breakpoints.down("lgg")]: {
                                                            width: "100%",
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setTabValueVertical(1);
                                                    }}
                                                >
                                                    Retroceder
                                                </Button>
                                                <Box sx={{
                                                    display: "flex", columnGap: "1.2rem",
                                                    [theme.breakpoints.down("lgg")]: {
                                                        flexDirection: "column",
                                                        rowGap: "1rem",
                                                    },
                                                }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: "10rem",
                                                            [theme.breakpoints.down("lgg")]: {
                                                                width: "100%",
                                                            },
                                                        }}
                                                        onClick={handleChangePreview}
                                                    >
                                                        Vista previa
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: "10rem",
                                                            [theme.breakpoints.down("lgg")]: {
                                                                width: "100%",
                                                            },
                                                        }}
                                                    >
                                                        Publicar
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: "10rem",
                                                            [theme.breakpoints.down("lgg")]: {
                                                                width: "100%",
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            setTabValueVertical(2);
                                                        }}
                                                    >
                                                        Siguiente
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "2.1rem",
                                paddingTop: "1rem",
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "3.5rem",
                                    fontWeight: "bold",
                                }}
                            >Titulo del aviso</Typography>

                            <Box sx={{
                                display: "flex", justifyContent: "space-between",
                                [theme.breakpoints.down("lgg")]: {
                                    flexDirection: "column",
                                    rowGap: "1rem",
                                },
                            }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "10rem",
                                        [theme.breakpoints.down("lgg")]: {
                                            width: "100%",
                                        },
                                    }}
                                    onClick={() => {
                                        setTabValueVertical(0);
                                    }}
                                >
                                    Retroceder
                                </Button>
                                <Box sx={{
                                    display: "flex", columnGap: "1.2rem",
                                    [theme.breakpoints.down("lgg")]: {
                                        flexDirection: "column",
                                        rowGap: "1rem",
                                    },
                                }}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: "10rem",
                                            [theme.breakpoints.down("lgg")]: {
                                                width: "100%",
                                            },
                                        }}
                                        onClick={handleChangePreview}
                                    >
                                        Vista previa
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: "10rem",
                                            [theme.breakpoints.down("lgg")]: {
                                                width: "100%",
                                            },
                                        }}
                                    >
                                        Publicar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: "10rem",
                                            [theme.breakpoints.down("lgg")]: {
                                                width: "100%",
                                            },
                                        }}
                                        onClick={() => {
                                            setTabValueVertical(2);
                                        }}
                                    >
                                        Siguiente
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <ModalDataStudies openModalStudy={openModalStudy} handleCloseModalEditDataStudies={handleCloseModalEditDataStudies} onStudtySave={() => { }} />
            <ModalDataLanguage openModalLanguage={openModalLanguage} handleCloseModalEditDataLanguage={handleCloseModalEditDataLanguage} onLanguageSave={() => { }} />
        </>

    );
};

export default PostMyAd;
