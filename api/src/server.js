const { connectToMongo } = require('./database/database')
const express = require('express')
const cors = require('cors')
const { urlencoded, json } = require('body-parser')
const { createAuthRouter } = require('./router/auth.router')
const { createProfileRouter } = require('./router/profile.router')






const  log  = require('./logger')






const run = async () => {
    try {
        const port = process.env.PORT || 5000;
        const app = express();

        //Db initialization
        await connectToMongo()





        //Middleware
        if (process.env.NODE_ENV !== 'production') {
            const morgan = require('morgan')
            app.use(morgan('combined'))
        }
        app.use(cors())
        app.use(json());
        app.use(urlencoded({ extended: true }));



        //routers
        app.use('/auth', createAuthRouter())
        app.use('/profile', createProfileRouter())



        //static files
        app.use('/static', express.static('upload'))

        //Server initialization
        app.listen(port, () => {
            log.info('Server is running on port ' + port)
        })



    } catch (err) {
        log.error("Couldn't start server.\n", err)
    }
}

run()

