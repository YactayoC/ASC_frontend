import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PlanillaPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/"); // Navegar hacia atrás en el historial
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Software de Planillas
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
                El software de planillas es una herramienta esencial para gestionar el pago de salarios y otros beneficios para los empleados de una empresa. Permite realizar cálculos automáticos de sueldos, deducciones, impuestos y más, simplificando así el proceso de nómina.
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
                Además, el software de planillas también puede ofrecer funciones adicionales como el seguimiento de asistencia, la generación de informes y la integración con sistemas de contabilidad y recursos humanos.
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
                En resumen, el software de planillas es una herramienta indispensable para garantizar la precisión y eficiencia en la gestión de la nómina de una empresa.
            </Typography>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <Paper sx={{ p: 5, height: '100%' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Características del Software de Planillas
                        </Typography>
                        <ul>
                            <li>Automatización de cálculos de nómina.</li>
                            <li>Seguimiento de asistencia y horas trabajadas.</li>
                            <li>Generación de informes y análisis de datos.</li>
                            <li>Integración con sistemas de contabilidad y recursos humanos.</li>
                            <li>Personalización de configuraciones y parámetros.</li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item md={6}>
                    <Paper sx={{ p: 5, height: '100%' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            ¿Por qué es importante el Software de Planillas?
                        </Typography>
                        <Typography variant="body1">
                            La gestión de la nómina es una tarea crítica para cualquier empresa. Un software de planillas confiable y eficiente ayuda a reducir errores, agilizar procesos y garantizar el cumplimiento de las regulaciones laborales.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Button onClick={handleBackClick} sx={{ mt: 2 }} variant="contained">
                Regresar
            </Button>
        </Container>
    );
};

export default PlanillaPage;
