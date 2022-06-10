const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
   
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    deletedAt: Date,
    sex: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }

})



const User = mongoose.model('User', userSchema)



User.sexes = ["male", "female"]
User.female = "female"
User.male = "male"



module.exports = {
    User
}