const { Router } = require('express')
const { uploadFile } = require('../middleware/file-upload')
const { registrationValidation, authValidation } = require('../validation/auth')
const { validate } = require('../validation/validate')

const authController = require('../controllers/auth.controller')




const createAuthRouter = () => {

    const AuthRouter = Router()




    AuthRouter.post('/register',
        uploadFile('avatar'),
        ...registrationValidation,
        validate,
        authController.register
    )


    AuthRouter.post('/login',
        ...authValidation,
        validate,
        authController.login
    )

    AuthRouter.post('/refresh',

        authController.refresh
    )

    return AuthRouter
}





module.exports = {
    createAuthRouter
}