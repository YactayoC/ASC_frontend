interface Respuesta {
    id: number;
    respuesta: string;
    peso: string;
}

interface Pregunta {
    id: number;
    pregunta: string;
    respuestas: Respuesta[];
}

interface PreguntaAbierta {
    id: number;
    pregunta: string;
}