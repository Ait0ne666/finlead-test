const { Router } = require("express")
const profileController = require('../controllers/profile.controller')
const {authorization} = require('../middleware/authorization')
const { uploadFile } = require("../middleware/file-upload")
const { profileUpdateValidation } = require("../validation/profile")
const { validate } = require('../validation/validate')

const createProfileRouter = () => {

    const ProfileRouter = Router()



    ProfileRouter.use(authorization)



    ProfileRouter.get('/', profileController.getProfile)
    ProfileRouter.get('/accounts', profileController.getProfiles)
    ProfileRouter.put('/',
    uploadFile('avatar'),
    ...profileUpdateValidation,
    validate,
    profileController.updateProfile)

    return ProfileRouter
}




module.exports = {
    createProfileRouter
}