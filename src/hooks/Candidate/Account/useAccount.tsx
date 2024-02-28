import apiClient from "../../../api/ApiClient";

const useAccount = () => {

    //CANDIDATE
    const updatePasswordCanddidate = async (postulanteId: Number, password: string) => {
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

    return {
        updatePasswordCanddidate
    }
}

export default useAccount;