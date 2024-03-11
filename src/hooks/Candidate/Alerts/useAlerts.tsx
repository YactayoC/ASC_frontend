import apiClient from '../../../api/ApiClient';

const useAlerts = () => {
    //alerts//get-alerts/:postulanteId
    const getAlerts = async (postulanteId: number) => {
        try {
            const response: any = await apiClient.get(`/alerts/get-alerts/${postulanteId}`);

            const responseData = response.data;

            return {
                response: responseData.data,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            //console.log(err);
            throw err;
        }
    }

    const createAlert = async (
        puesto_interes: string,
        ubicacion: string,
        frecuencia: string,
        postulante_id: Number
    ) => {
        try {
            const response: any = await apiClient.post(`/alerts/create-alert`, {
                puesto_interes,
                ubicacion,
                frecuencia,
                postulante_id
            });

            const responseData = response.data;

            return {
                response: responseData.message,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            //console.log(err);
            throw err;
        }
    }

    const updateAlert = async (
        alertId: Number,
        puesto_interes: string,
        ubicacion: string,
        frecuencia: string,
        postulante_id: Number
    ) => {
        try {
            const response: any = await apiClient.put(`/alerts/update-alert`, {
                alertId,
                puesto_interes,
                ubicacion,
                frecuencia,
                postulante_id
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            //console.log(err);
            throw err;
        }
    }

    //get-alert/:alertId
    const getAlertById = async (alertId: number) => {
        try {
            const response: any = await apiClient.get(`/alerts/get-alert/${alertId}`);

            const responseData = response.data;

            return {
                response: responseData.data,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            //console.log(err);
            throw err;
        }
    }

    return {
        getAlerts,
        createAlert,
        updateAlert,
        getAlertById
    }
}

export default useAlerts;