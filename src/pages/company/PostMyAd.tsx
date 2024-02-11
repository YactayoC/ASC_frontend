import HeaderButtons from "../../components/candidate/HeaderButtons";
import { HeaderMainPage } from "../../components/layout/HeaderMainPage";
import { useState } from "react";
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
} from "@mui/material";

import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Add } from "@mui/icons-material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchJob from "../../components/common/SearchJob";
import theme from "../../../theme";

const PostMyAd = () => {
    const [tabValueHorizontal, setTabValueHorizontal] = useState(0);
    const [tabValueVertical, setTabValueVertical] = useState(0);
    const [preview, setPreview] = useState(true);
    const [alignment, setAlignment] = useState('inscritos');
    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleChangeToogle = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
    };

    const handleChange = (_e: any, newValue: number) => {
        setTabValueHorizontal(newValue);
    };

    const handleChangeVertical = (_e: any, newValue: number) => {
        setTabValueVertical(newValue);
        setShowSearchBar(newValue === 0);

    };

    const handleChangePreview = () => {
        console.log("ver preview")
        setPreview(!preview);
    }

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
        { label: "Abierta" },
        { label: "Cerrada" },
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

    return (
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
                            }}
                        >
                            <Tab label="Datos del aviso" value={0} />
                            <Tab label="Datos de la publicación" value={1} />
                            <Tab label="Proceso de selección" value={2} />
                        </Tabs>

                        <Box sx={{ flexGrow: 1, width: "100%" }}>
                            {tabValueVertical === 0 && (
                                <Box>
                                    <Tabs
                                        value={tabValueHorizontal}
                                        onChange={handleChange}
                                        aria-label="Horizontal tabs example"
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
                                                [theme.breakpoints.down("xl")]: {
                                                    paddingRight: "2rem",
                                                },
                                                [theme.breakpoints.down("md")]: {
                                                    paddingRight: "0",
                                                    rowGap: "1rem",
                                                },
                                                [theme.breakpoints.down("sm")]: {
                                                    paddingRight: "2rem",
                                                }
                                            }}
                                        >
                                            <FormControlLabel
                                                control={<Checkbox name="hideCompanyName" />}
                                                label="Ocultar el nombre de la empresa"
                                                sx={{
                                                    alignSelf: "flex-end",
                                                    [theme.breakpoints.down("md")]: {
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
                                                    [theme.breakpoints.down("md")]: {
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
                                                        [theme.breakpoints.down("md")]: {
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
                                                    [theme.breakpoints.down("md")]: {
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
                                                            [theme.breakpoints.down("md")]: {
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
                                                        [theme.breakpoints.down("md")]: {
                                                            width: "100%",
                                                        }
                                                    }}

                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Sector" />
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
                                                    [theme.breakpoints.down("md")]: {
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
                                                        [theme.breakpoints.down("md")]: {
                                                            width: "100%",
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Tipo de Jornada" />
                                                    )}
                                                />
                                                <Typography sx={{
                                                    [theme.breakpoints.down("md")]: {
                                                        width: "100%",
                                                        textAlign: "left",
                                                    }
                                                }} >Rango salarial</Typography>
                                                <TextField label="Desde" sx={{
                                                    [theme.breakpoints.down("md")]: {
                                                        width: "100%",
                                                    }
                                                }} />
                                                <TextField label="Hasta" sx={{
                                                    [theme.breakpoints.down("md")]: {
                                                        width: "100%",
                                                    }
                                                }} />
                                                <FormControlLabel
                                                    control={<Checkbox name="hideCompanyName" />}
                                                    label="Ocultar salario"
                                                    sx={{
                                                        alignSelf: "flex-end",
                                                        [theme.breakpoints.down("md")]: {
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
                                                        [theme.breakpoints.down("md")]: {
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
                                                width: "auto",
                                            }}
                                        >
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={questionType}
                                                sx={{ width: "20rem" }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Tipo de pregunta" />
                                                )}
                                            />
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
                                        paddingTop: "1rem",
                                        width: "auto",
                                        [theme.breakpoints.down("lg")]: {
                                            paddingRight: "2rem",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.8rem",
                                            fontWeight: "bold",
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
                                            paddingTop: "1rem",
                                            width: "auto",
                                            [theme.breakpoints.down("lg")]: {
                                                paddingRight: "2rem",
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "1.8rem",
                                                fontWeight: "bold",
                                                [theme.breakpoints.down("sm")]: {
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
                                                        borderLeft: "0.8px solid rgba(0, 0, 0, 0.54) !important",
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
                                                        borderLeft: "0.8px solid rgba(0, 0, 0, 0.54) !important",
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
                                                        borderLeft: "0.8px solid rgba(0, 0, 0, 0.54) !important",
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
                                                }}
                                            >Envio de correo automático</Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: "1.3rem",
                                                    fontWeight: "bold",
                                                    paddingLeft: "3rem",
                                                }}
                                            >Seleccione la plantilla a enviar:</Typography>
                                            <RadioGroup
                                                row
                                                sx={{
                                                    paddingLeft: "7rem",
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
                                                }}
                                            >
                                                <Button component="label" variant="contained"
                                                    sx={{
                                                        height: "4rem",
                                                    }}
                                                    startIcon={<CloudUploadIcon />}>
                                                    Adjuntar archivo
                                                    <VisuallyHiddenInput type="file" />
                                                </Button>
                                                <p>Formatos de archivo permitidos: .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx, .ppt, .pptx y .pdf<br />Cada archivo puede tener un tamaño máximo de 5 MB</p>
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
    );
};

export default PostMyAd;
