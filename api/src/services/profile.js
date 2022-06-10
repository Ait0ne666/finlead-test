const { config } = require('../config')
const userRepository = require('../repositories/user.repository')
const authService = require('./auth')




const getProfile = async (id) => {


    const user = await userRepository.getUserById(id)


    if (!user) {
        throw new Error("User not found")
    }



    return {
        id: user._id,
        username: user.username,
        avatar: config.staticFolder + user.avatar,
        birthday: user.birthday
    }

}


const updateProfile = async ({ id, avatar, username, oldPassword, newPassword }) => {
    const user = await userRepository.getUserById(id)
    let password;

    if (!user) {
        throw new Error("User not found")
    }


    if (oldPassword && newPassword) {
        const passCorrect = await authService.compare(oldPassword, user.password)

        if (!passCorrect) {
            throw new Error("Incorrect password")
        }


        password = await authService.encryptPassword(newPassword)
    }



    const updatedUser = await userRepository.updateUser({
        id: id,
        avatar: avatar,
        username: username,
        password: password
    })


    return {
        id: updatedUser._id,
        username: updatedUser.username,
        avatar: config.staticFolder + updatedUser.avatar,
        birthday: updatedUser.birthday
    }

}



const getProfiles = async (id) => {



    const user = await userRepository.getUserById(id)

    if (!user) {
        throw new Error("User not found")
    }



    const users = await userRepository.getUsers(id)


    return users.map((user) => ({
        id: user._id,
        username: user.username,
        avatar: config.staticFolder + user.avatar,
        birthday: user.birthday
    }))
}


module.exports = {
    getProfile,
    updateProfile,
    getProfiles
}