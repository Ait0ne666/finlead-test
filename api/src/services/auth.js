const bcrypt = require('bcrypt')
const userRepository = require('../repositories/user.repository')
const jwt = require('jsonwebtoken')
const { config } = require('../config')



const register = async ({ email, username, password, avatar, sex, birthday, }) => {


    const existingUser = await userRepository.getUserByEmail(email)


    if (existingUser) {
        throw new Error("User with such email already exist")
    }


    const encrypted = await encryptPassword(password)

    const user = await userRepository.createUser({
        email, username, password: encrypted, avatar, sex, birthday
    })


    return user

}

const login = async ({ email, password, }) => {

    const user = await userRepository.getUserByEmail(email)


    if (!user) {
        throw new Error("Incorrect email or password")
    }


    const passCorrect = await compare(password, user.password)





    if (!passCorrect) {
        throw new Error("Incorrect email or password")
    }


    const tokens = generateTokens(user._id)




    return tokens



}


const refresh = (auth, refresh) => {

    const id = verifyTokens(auth, refresh)



    if (!id) {
        throw new Error("Incorrect tokens")
    }



    const tokens = generateTokens(id)




    return tokens


}









const encryptPassword = async (pass) => {
    return await bcrypt.hash(pass, 10)
}


const compare = (pass, encrypted) => {


    return bcrypt.compare(pass, encrypted)
}


const generateTokens = (id) => {
    const payload = {
        id: id,
        auth: true
    }

    const token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: "1h"
    })


    payload.auth = false

    const refresh = jwt.sign(payload, config.refreshSecret, {
        expiresIn: "90d"
    })


    return {
        jwt: token,
        refresh: refresh
    }
}


const verifyTokens = (auth, refresh) => {

    try {
        const jwtPayload = jwt.verify(auth, config.jwtSecret, {
            ignoreExpiration: true
        })


        if (!jwtPayload.auth) {
            return null
        }

        const refreshPayload = jwt.verify(refresh, config.refreshSecret)


        if (refreshPayload.auth) {
            return null
        }

        if (refreshPayload.id !== jwtPayload.id) {
            return null
        }


        return jwtPayload.id
    } catch (e) {
        return null
    }
}






module.exports = {
    register,
    login,
    refresh,
    compare,
    encryptPassword
}