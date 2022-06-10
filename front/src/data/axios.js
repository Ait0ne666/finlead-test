import Axios from "axios"
import { getJwt } from "./local-data"

const axios = Axios.create()






axios.interceptors.request.use(function (config) {
    const token = getJwt()

    if (token) {
        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${token}`
        }
    }

    return config;
  })




export default axios