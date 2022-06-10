

const mongoose = require('mongoose');
const { config } = require('../config');


const connectToMongo = async () => {
    return mongoose.connect(config.dbString)
}



module.exports = {
    connectToMongo
}



