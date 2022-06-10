
import { format } from "date-fns";
import { API_URL } from "../../config";
import axios from "../axios";
import { saveJwt, saverefresh, saveUser } from "../local-data";



export const getProfile = async () => {

    const url = API_URL + '/profile'


    const response = await axios.get(url)

    const user = {
        username: response.data.username,
        avatar: API_URL + response.data.avatar,
        id: response.data.id,
        birthday: response.data.birthday
    }

    return user

};




export const login = async (
    email,
    password
) => {

    const url = API_URL + '/auth/login'

    const data = {
        email,
        password
    }


    try {
        const response = await axios.post(url, data)


        const jwt = response.data.jwt
        const refresh = response.data.refresh

        saveJwt(jwt)
        saverefresh(refresh)


        const user = await getProfile()

        saveUser(user)
        return user
    } catch (err) {
        if (err.response.status === 400) {
            return 'Неверный логин или пароль'
        }
        return 'Ошибка авторизации'
    }


};





export const register = async (
    { email,
        password,
        avatar,
        username,
        sex,
        birthday }
) => {

    const url = API_URL + '/auth/register'

    try {

        const formData = new FormData()

        

        formData.append("avatar", avatar)
        formData.append("email", email)
        formData.append("username", username)
        formData.append("sex", sex)
        formData.append("password", password)
        formData.append("birthday", format(birthday, "dd-MM-yyyy"))


        const response = await axios.post(url, formData)

        return response.data
    } catch (err) {
        if (err.response?.status === 400) {
            return err.response.data.errors[0].msg
        }
        return 'Ошибка регистрации'
    }


};



export const update = async (
    { 
        avatar,
        username,
        oldPassword,
        newPassword
 }
) => {

    const url = API_URL + '/profile'

    try {

        const formData = new FormData()

        
        if (avatar) {
            formData.append("avatar", avatar)
        }

        if (username) {
            formData.append("username", username)
            
        }
        if (oldPassword ) {
            formData.append("oldPassword", oldPassword)
        }

        if (newPassword ) {
            formData.append("newPassword", newPassword)
        }
    
        const response = await axios.put(url, formData)

        const user = {
            username: response.data.username,
            avatar: API_URL + response.data.avatar,
            id: response.data.id,
            birthday: response.data.birthday
        }

        saveUser(user)


        return user
    } catch (err) {
        if (err.response?.status === 400) {
            return err.response.data.errors[0].msg
        }
        return 'Ошибка сохранения'
    }


};