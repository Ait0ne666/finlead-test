
const log = require('../logger')
const authService = require('../services/auth')



const register = async (req, res) => {

    const { email, username, sex, birthday, password } = req.body
    const file = req.file


    if (!file) {
        return res.status(400).send({ message: "avatar is required" })
    }


    try {

        await authService.register({
            email,
            username,
            sex,
            birthday,
            password,
            avatar: file.filename
        })



        return res.status(200).send({
            message: "Successful registration"
        })



    } catch (err) {
        log.error("Error in AuthController/register: " + err)

        console.log(err)
        return res.status(400).send({
            errors: [
                {
                    msg: err.message
                }
            ]
        })
    }
}



const login = async (req, res) => {

    const { email, password } = req.body


    try {

        const loginResult = await authService.login({
            email,
            password,
        })



        return res.status(200).send(loginResult)



    } catch (err) {
        log.error("Error in AuthController/login: " + err)



        return res.status(400).send({
            errors: [
                {
                    msg: err.message
                }
            ]
        })
    }



}


const refresh = async (req, res) => {

    const auth = req.headers.authorization
    const { refresh } = req.body


    if (!auth ) {
        return res.status(403).send({
            errors: [
                {
                    msg: "Authorization token is missing from headers"
                }
            ]
        })
    }

    if (!refresh ) {
        return res.status(403).send({
            errors: [
                {
                    msg: "refresh token is missing from body"
                }
            ]
        })
    }

    try {
        const tokens = authService.refresh(auth.replace("Bearer ", ""), refresh)


        return res.status(200).send(tokens)
    } catch (err) {
        log.error("Error in AuthController/refresh: " + err)
        return res.status(400).send({
            errors: [
                {
                    msg: err.message
                }
            ]
        })
    }

}




module.exports = {
    register,
    login,
    refresh
}