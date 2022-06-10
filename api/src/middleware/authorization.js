const jwt = require('jsonwebtoken')
const { config } = require('../config')

const authorization = (req, res, next) => {
    const headers = req.headers


    

    const authHeader = headers.authorization

    const parts = authHeader?.split(" ")

    if (!parts || parts.length < 2) {
        res.status(403).send({
            errors: [
                {
                    msg: "Unauthorized"
                }
            ]
        })
    } else {
        try {
            const payload = jwt.verify(parts[1], config.jwtSecret) 
            

    
            if (!payload.id || !payload.auth) {
                res.status(403).send({
                    errors: [
                        {
                            msg: "Unauthorized"
                        }
                    ]
                })
            } else {
                req.user = payload.id
    
                next()
    
            }

        } catch (err) {
            res.status(403).send({
                errors: [
                    {
                        msg: "Unauthorized"
                    }
                ]
            })   
        }



    }
}



module.exports = {
    authorization
}