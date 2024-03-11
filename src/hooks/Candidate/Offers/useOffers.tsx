import apiClient from "../../../api/ApiClient";

const useOffers = () => {

    const getOffersByProvinceId = async (provinciaId: number) => {
        try {
            const response: any = await apiClient.get(`/offers/get-offer/provinciaid/${provinciaId}`);

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

    const getOffersByJob = async (job: string) => {
        try {
            const response: any = await apiClient.get(`/offers/get-offer/puesto/${job}`);

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

    const getOffersByAreaId = async (areaId: number) => {
        try {
            const response: any = await apiClient.get(`/offers/get-offer/area/${areaId}`);

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

    const getOffersByJobAndProvinceId = async (job: string, provinciaId: number) => {
        try {
            const response: any = await apiClient.get(`/offers/get-offer/job/${job}/provinciaid/${provinciaId}`);

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

    // LIST AREEAS TOP http://localhost:3000/api/offers/get-offer/areas-top
    const getAreasTop = async () => {
        try {
            const response: any = await apiClient.get(`/offers/get-offer/areas-top`);

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

    const applyOffer = async (ofertaId: number, postulanteId: number) => {
        try {
            const response: any = await apiClient.post(`/offers/apply-offer`, { ofertaId, postulanteId });

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

    //OBTENER LAS OFERTAS POR USUARIO
    const getOffersByUserId = async (userId: number) => {
        try {
            const response: any = await apiClient.get(`/offers/get-offers/user/${userId}`);

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

    return { getOffersByProvinceId, getOffersByJob, getOffersByAreaId, getOffersByJobAndProvinceId, applyOffer, getOffersByUserId, getAreasTop };
}

export default useOffers;
