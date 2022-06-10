


if (process.env.NODE_ENV!=='production') {
    require('dotenv').config()
}

const dbString = process.env.DB_STRING
const jwtSecret = process.env.JWT_SECRET
const refreshSecret = process.env.REFRESH_SECRET
const staticFolder = process.env.STATIC_FOLDER

 const config = {
    dbString,
    jwtSecret,
    refreshSecret,
    staticFolder
}



module.exports = {
    config
}


