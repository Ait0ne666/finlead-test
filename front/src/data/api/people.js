import { API_URL } from "../../config";
import axios from "../axios";


export const getPeople = async () => {

    const url = API_URL + '/profile/accounts'

    try {
        const response = await axios.get(url)
    
    
        const people = response.data
    
    
        return people.map((user) => {
            return {
                username: user.username,
                avatar: API_URL + user.avatar,
                id: user.id,
                birthday: user.birthday
    
            }
    
    
        })

    } catch (err) {
        throw new Error("Не удалось загрузить список")
    }



};
