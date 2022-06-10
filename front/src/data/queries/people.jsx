import { useQuery } from "react-query"
import { getPeople } from "../api/people"

export const usePeople = () => {
    return useQuery('people', getPeople, {
        staleTime: 1000 * 60,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}