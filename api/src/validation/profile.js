const {body} = require('express-validator')



const profileUpdateValidation = [
    body("username").optional().trim(),
    body("newPassword").optional().trim(),
    body("oldPassword").if(body("newPassword").exists({checkFalsy: true})).exists({checkFalsy: true}),
]



module.exports = {
    profileUpdateValidation
}