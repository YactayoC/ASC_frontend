import apiClient from "../api/ApiClient";

const useDataDefault = () => {

    async function getDataDefault() {
        try {
            //QUIERO QUE HAGA LA PETICION Y ME IMPRIMA EN FORMATO JSON LA DATA 
            const response = await apiClient.get("/seed");
            const data = response.data;
            console.log(data);
            return data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    return {
        getDataDefault
    }

}

export default useDataDefault;