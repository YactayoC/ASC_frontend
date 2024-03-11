import apiClient from '../../../api/ApiClient';

const usePostulations = () => {
    const getPostulations = async (postulanteId: number) => {
        try {
            const response: any = await apiClient.get(`/postulations/candidate/get-postulations-apply/${postulanteId}`);

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

    //ROUTE candidate/update-postulation-state
    const updatePostulationState = async (postulacionId: number, descripcionEstado: string) => {
        try {
            const response: any = await apiClient.put(`/postulations/candidate/update-postulation-state`, {
                descripcionEstado,
                postulacionId
            });

            const responseData = response;

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
        getPostulations,
        updatePostulationState
    };
}

export default usePostulations;