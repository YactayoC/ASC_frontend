import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LinkInterestPageJobs = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom marginBottom={"2rem"}>
                Empleos Destacados
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
                En nuestro portal de empleos, nos dedicamos a ofrecer una amplia variedad de oportunidades laborales excepcionales para profesionales en búsqueda de crecimiento y desarrollo. Desde puestos de alto nivel en empresas multinacionales hasta oportunidades de trabajo independiente, nuestro objetivo es conectar a los candidatos con las mejores oportunidades de empleo disponibles.
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <img src="https://deproconsultores.com/wp-content/uploads/2018/11/Art-245-Trabajo-en-casa-1.jpg" alt="Job" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <Box>
                            <Typography variant="body1" align="justify" paragraph>
                                Nuestro enfoque en empleos destacados garantiza que los usuarios encuentren oportunidades que se alineen con sus habilidades, experiencia y aspiraciones. Trabajamos en estrecha colaboración con empresas de renombre en diversas industrias para ofrecer una amplia gama de oportunidades laborales que abarcan desde roles técnicos hasta posiciones de liderazgo.
                            </Typography>
                            <Typography variant="body1" align="justify" paragraph>
                                Los empleos destacados en nuestro portal ofrecen salarios competitivos, beneficios atractivos y oportunidades de crecimiento profesional. Cada oportunidad de empleo proporciona una descripción detallada de las responsabilidades del trabajo, los requisitos y los beneficios asociados. Esto permite a los candidatos tomar decisiones informadas sobre su futuro profesional y encontrar el trabajo perfecto que se adapte a sus necesidades y objetivos.
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary" size="large" fullWidth onClick={handleBackClick}>
                            Explorar Empleos Destacados
                        </Button>
                    </Box>

                </Grid>
            </Grid>
        </Container>
    );
};

export default LinkInterestPageJobs;
