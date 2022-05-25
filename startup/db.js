const mongoose = require('mongoose')
const {logger} = require('../lib/utils/logger')

module.exports.init = init  =>{
    // connect to db
    mongoose.connect('mongodb://localhost/customerDB',{ useUnifiedTopology: true,useNewUrlParser: true  });
    const db = mongoose.connection;

    db.on('error', logger.error.bind(logger, 'DB connection error:'));
    db.once('open', () => {
        logger.info('DB connected.')
        init();
    });
}