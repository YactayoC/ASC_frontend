import apiClient from "../../api/ApiClient";
import { useAtom } from "jotai";
import { userAtomPostulant, userAtomCompany } from "../../store/user";

const useAuth = () => {


    const [_userP, setUserAtomP] = useAtom(userAtomPostulant);
    const [_userC, setUserAtomC] = useAtom(userAtomCompany);

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
            throw err;
        }
    }

    const registerCompleteCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/candidate/register-complete", data);

            const responseData = response.data;

            localStorage.setItem("userInfo", JSON.stringify(responseData.data));

            setUserAtomP(responseData.data)

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

    const loginCandidate = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/login/candidate", data);

            const responseData = response.data;

            setUserAtomP(responseData.data);

            localStorage.setItem("userInfo", JSON.stringify(responseData.data));

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
            throw err;
        }
    }

    const registerCompleteCompany = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/company/register-complete", data);

            const responseData = response.data;

            localStorage.setItem("userInfo", JSON.stringify(responseData.data));

            setUserAtomC(responseData.data)

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

    const loginCompany = async (data: any) => {
        try {
            const response: any = await apiClient.post("/auth/login/company", data);

            const responseData = response.data;

            localStorage.setItem("userInfo", JSON.stringify(responseData.data));

            setUserAtomC(responseData.data)

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
        registerIncompleteCandidate,
        loginCandidate,
        loginCompany,
        registerCompleteCandidate,
        registerIncompleteCompany,
        registerCompleteCompany
    }
}

export default useAuth;