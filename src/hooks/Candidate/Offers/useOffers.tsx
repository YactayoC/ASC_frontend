import apiClient from "../../../api/ApiClient";

const useOffers = () => {

    const getOffersByProvinceId = async (provinciaId: number) => {
        try {
            const response: any = await apiClient.get(`/get-offers/provinciaid/${provinciaId}`);

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

    const getOffersByJob = async (job: string) => {
        try {
            const response: any = await apiClient.get(`/get-offers/puesto/${job}`);

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

    const getOffersByAreaId = async ( areaid : number ) => {
        try {
            const response: any = await apiClient.get(`/get-offers/areaid/${areaid}`);

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

    const getOffersByJobAndProvinceId = async (job: string, provinciaId: number) => {
        try {
            const response: any = await apiClient.get(`/get-offers/job/${job}/provinciaid/${provinciaId}`);

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

    return { getOffersByProvinceId, getOffersByJob, getOffersByAreaId, getOffersByJobAndProvinceId };
}

export default useOffers;
