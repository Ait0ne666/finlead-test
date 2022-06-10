const {body} = require('express-validator')
const { User } = require('../models/user')


const registrationValidation = [
    body('email').trim().isEmail().normalizeEmail(), 
    body("username").trim().exists({checkFalsy: true}),
    body("birthday").trim().isDate({format: "DD-MM-YYYY"}),
    body("sex").trim().custom(value => {
        if (!User.sexes.includes(value)) {
            return Promise.reject("sex should be one of the [male, female]")
        }


        return true
    }),
    body("password").trim().exists({checkFalsy: true}) 
]



const authValidation = [
    body('email').trim().isEmail().normalizeEmail(), 
    body("password").trim().exists({checkFalsy: true}) 
]




module.exports = {
    registrationValidation,
    authValidation
}