import apiClient from "../../../api/ApiClient";

const useAccount = () => {

    //CANDIDATE
    const updatePasswordCandidate = async (postulanteId: Number, password: string) => {
        try {
            const response: any = await apiClient.put(`/account/candidate/change-password`, {
                postulanteId,
                password
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const changeVisibilityCV = async (visibleState: Number, postulanteId: Number) => {
        try {
            const response: any = await apiClient.put(`/account/candidate/change-cv-visible`, {
                visibleState,
                postulanteId
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const deactivateAccount = async (postulanteId: Number, reasonDelete: string) => {
        try {
            const response: any = await apiClient.put(`/account/candidate/deactivate-account`, {
                postulanteId,
                reasonDelete
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    //PERSONAL INFORMATION
    const getPersonalInformation = async (postulanteId: Number) => {
        try {
            const response: any = await apiClient.get(`/account/candidate/get-personal-info/${postulanteId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const getIncompletePersonalInformation = async (postulanteId: Number) => {
        try {
            const response: any = await apiClient.get(`/account/candidate/get-incomplete-personal-info/${postulanteId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const updatePersonalinformation = async (
        postulanteId: Number,
        nombre: string,
        apellidos: string,
        fechaNacimiento: string,
        estadoCivil: string,
        tipoDocumentoId: Number,
        documento: string,
        descripcionPerfil: string,
        numero: string,
        direccion: string
    ) => {
        try {
            const response: any = await apiClient.put(`/account/candidate/update-personal-info`, {
                postulanteId,
                nombre,
                apellidos,
                fechaNacimiento,
                estadoCivil,
                tipoDocumentoId,
                documento,
                descripcionPerfil,
                numero,
                direccion
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const changeEmailCandidate = async (postulanteId: Number, email: string) => {
        try {
            const response: any = await apiClient.put(`/account/candidate/change-email`, {
                postulanteId,
                email
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    //candidate/get-types-document
    const getTypesDocument = async () => {
        try {
            const response: any = await apiClient.get(`/account/candidate/get-types-document`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    //SECCION EXPEREINCIA 
    const getExperienceInformation = async (postulanteId: Number) => {
        try {
            const response: any = await apiClient.get(`/account/candidate/get-experience-info/${postulanteId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const insertExperienceInformation = async (
        //PARAMETROS postulanteId, cargo, funcioneFs, empresa, anio_inicio, anio_fin
        postulanteId: Number,
        cargo: string,
        funciones: string,
        empresa: string,
        anio_inicio: Number,
        anio_fin: Number
    ) => {
        try {
            const response: any = await apiClient.post(`/account/candidate/experience-info`, {
                postulanteId,
                cargo,
                funciones,
                empresa,
                anio_inicio,
                anio_fin
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const deleteExperienceInformation = async (experienceId: Number) => {
        try {
            const response: any = await apiClient.delete(`/account/candidate/experience-info/${experienceId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    //SECCION ESTUDIOS
    const getStudiesInformation = async (postulanteId: Number) => {
        try {
            const response: any = await apiClient.get(`/account/candidate/get-education-info/${postulanteId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const insertStudiesInformation = async (
        postulanteId: Number,
        descripcionEstudio: string,
        titulo: string,
        institucion: string,
        anio_inicio: Number,
        anio_fin: Number
    ) => {
        try {
            const response: any = await apiClient.post(`/account/candidate/education-info`, {
                postulanteId,
                descripcionEstudio,
                titulo,
                institucion,
                anio_inicio,
                anio_fin
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const deleteStudiesInformation = async (educationId: Number) => {
        try {
            const response: any = await apiClient.delete(`/account/candidate/education-info/${educationId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    //SECCION IDIOMAS
    const getLanguagesInformation = async (postulanteId: Number) => {
        try {
            const response: any = await apiClient.get(`/account/candidate/get-language-info/${postulanteId}`);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const insertLanguagesInformation = async (
        postulanteId: Number,
        idiomaId: Number,
        nivelIdioma: string
    ) => {
        try {
            const response: any = await apiClient.post(`/account/candidate/language-info`, {
                postulanteId,
                idiomaId,
                nivelIdioma
            });

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    const deleteLanguagesInformation = async (languageId: Number) => {
        try {
            const response: any = await apiClient.delete(`/account/candidate/language-info/${languageId}`);

            const responseData = response.data;

            return {
                response: responseData,
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
        updatePasswordCandidate,
        changeVisibilityCV,
        deactivateAccount,
        getPersonalInformation,
        updatePersonalinformation,
        getExperienceInformation,
        insertStudiesInformation,
        getStudiesInformation,
        insertExperienceInformation,
        getLanguagesInformation,
        insertLanguagesInformation,
        changeEmailCandidate,
        getIncompletePersonalInformation,
        getTypesDocument,
        deleteExperienceInformation,
        deleteStudiesInformation,
        deleteLanguagesInformation
    }
}

export default useAccount;