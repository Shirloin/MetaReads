import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";


export const useUserById = async () => {
    async function getUserById(internetIdentityId: Principal) {
        try {
            const getUserById = await MetaReads_backend.get_user(internetIdentityId);
            return getUserById;
        } catch (error: any) {
            return error.message;
        }
    }

    return { getUserById }
}