import apiClient from "../../api/ApiClient";

const useAuth = () => {
    
    //CANDIDATE
    const registerIncompleteCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/register-incomplete-candidate", data);

            const responseData = response.data;

            return {
                response: JSON.stringify(responseData),
                status: response.status,
                ok: true
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const registerCompleteCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/candidate/register-complete", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/login/candidate", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    //COMPANY
    const registerIncompleteCompany = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/company/register-incomplete", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    const registerCompleteCompany = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/company/register-complete", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginCompany = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/login/company", data);

            const responseData = response.data;

            return {
                response: responseData,
                status: response.status,
                ok: true
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    return {
        registerIncompleteCandidate,
        loginCandidate,
        loginCompany,
        registerCompleteCandidate,
        registerIncompleteCompany,
        registerCompleteCompany
    }
}

export default useAuth;