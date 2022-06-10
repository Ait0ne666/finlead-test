const { User } = require("../models/user")

const createUser = async ({email, username, password, sex, avatar, birthday}) => {
    console.log(email, username, password, sex, avatar, birthday)
    const user = new User({
        email, 
        username, 
        password, 
        sex, 
        avatar,
        birthday, 
    })

    await user.save()

    return user
}

const getUserByEmail = async (email) => {

    const user = await User.findOne({
        email: email
    })


    return user
}



const getUserById = async (id) => {


    return User.findById(id)
}

const getUsers =  (id) => {


    return User.find({
        _id: {$ne: id},
        deletedAt: undefined
    }).select('username avatar birthday')
}


const updateUser = async ({id, username, avatar, password}) => {
    const user = await User.findById(id)

    if (username) {
        user.username = username
    }

    if (avatar) {
        user.avatar = avatar
    }

    if (password) {
        user.password = password
    }


    return user.save()
}



module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getUsers,
    updateUser
}