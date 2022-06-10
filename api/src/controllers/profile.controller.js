const profileService = require('../services/profile')
const log = require('../logger')

const getProfile = async (req, res) => {

    const id = req.user




    try {
        const profile = await profileService.getProfile(id)


        return res.status(200).send(profile)
    } catch (err) {
        log.error("Error in ProfileController/getProfile: " + err)
        return res.status(400).send({
            errors: [
                {
                    msg: err.message
                }
            ]
        })
    }


}



const updateProfile = async (req, res) => {

    const id = req.user
    const file = req.file
    const {oldPassword, newPassword, username} = req.body



    if (!file && !oldPassword && !newPassword && !username) {
        return res.status(400).send({
            errors: [
                {
                    msg: "Nothing to update"
                }
            ]
        })
    }


    try {
        const profile = await profileService.updateProfile({
            id,
            avatar: file?.filename,
            oldPassword,
            newPassword,
            username,
        })


        return res.status(200).send(profile)
    } catch (err) {
        log.error("Error in ProfileController/getProfile: " + err)
        return res.status(400).send({
            errors: [
                {
                    msg: err.message
                }
            ]
        })
    }

}


const getProfiles = async (req, res) => {

    const id = req.user




    try {
        const profiles = await profileService.getProfiles(id)


        return res.status(200).send(profiles)
    } catch (err) {
        log.error("Error in ProfileController/getProfiles: " + err)
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
    getProfile,
    updateProfile,
    getProfiles
}