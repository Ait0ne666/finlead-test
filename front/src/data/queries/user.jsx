import { useMutation, useQuery } from "react-query"
import { getProfile } from "../api/user"
import { clearJwt, clearrefresh, deleteUser, getUser } from "../local-data"

export const useUser = () => {
    return useQuery('user', getProfile, {
        staleTime: 3600 * 1000,
        retry: 0,
        refetchOnWindowFocus: false,
        initialData: getUser(),
        initialDataUpdatedAt: new Date(2020, 11, 1).getTime()
    })
}


export const logout = async () => {
    clearJwt()
    clearrefresh()
    deleteUser()
}