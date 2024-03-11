import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const LinkInterestPageQuestions = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    }

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Preguntas Frecuentes
            </Typography>
            <Accordion sx={{ my: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq1-content"
                    id="faq1-header"
                >
                    <Typography variant="h6">¿Cómo puedo buscar un empleo en el portal?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        Para buscar un empleo en nuestro portal, simplemente dirígete a la página de inicio y utiliza el formulario de búsqueda. Puedes ingresar palabras clave, ubicación y otros filtros para encontrar los empleos que se ajusten a tus criterios.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ my: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq2-content"
                    id="faq2-header"
                >
                    <Typography variant="h6">¿Cómo puedo crear una cuenta de usuario?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        Para crear una cuenta de usuario en nuestro portal, haz clic en el enlace "Postula aquí" en la parte superior derecha de la página. Luego, sigue las instrucciones para completar el formulario de registro con tu información personal y crear tu cuenta.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ my: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faq3-content"
                    id="faq3-header"
                >
                    <Typography variant="h6">¿Cómo puedo aplicar a un empleo?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        Para aplicar a un empleo en nuestro portal, primero debes iniciar sesión en tu cuenta de usuario. Luego, visita la página de detalles del empleo que te interesa y haz clic en el botón "Buscar". Completa el formulario de solicitud y envía tu aplicación.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Button onClick={handleBackClick} variant="contained" sx={{ mt: 2 }}>
                Regresar
            </Button>
        </Container>
    );
};

export default LinkInterestPageQuestions;
