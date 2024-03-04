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
            console.log(err);
            throw err;
        }
    }

    const createAlert = async (data: any) => {
        try {
            const response: any = await apiClient.post(`/alerts/create-alert`, data);

            const responseData = response.data;

            return {
                response: responseData.data,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const updateAlert = async (data: any) => {
        try {
            const response: any = await apiClient.put(`/alerts/update-alert`, data);

            const responseData = response.data;

            return {
                response: responseData.data,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    return {
        getAlerts,
        createAlert,
        updateAlert
    }
}

export default useAlerts;