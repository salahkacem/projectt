const express = require('express');
const path = require('path');
const config = require ('./startup/config');
const winston = require ('winston');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const volRouter = require('./routes/vol');
const hotelRouter = require('./routes/hotel');
const app = express();

const {init}= require('./startup/db');


var MongoClient = require('mongodb').MongoClient;
// Database
var db;

// setup mongo connection
MongoClient.connect('mongodb://localhost/customerDB', function(err, database) {
    if (err) {
        throw err;
    }
    else {
        db = database;
        console.log("Connected to db!");
    }
});

// make our db accessible to our router
app.use(function(req, res, next) {
    req.db = db;
    next();
});

require('./startup/logging')();
require('./startup/validations')();

//app.use(expressLayoutes);
app.set('view engine' , 'ejs');
init(()=>{
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', userRouter);
    app.use('/', homeRouter);
    app.use('/', volRouter);
    app.use('/', hotelRouter);
}
)

//app.use(err);


app.listen(config.port, () =>winston.info('App is listening on url http://localhost:' + config.port))
