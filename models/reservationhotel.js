var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hotelSchema = new Schema({
     hotel: { type: mongoose.Schema.ObjectId, ref: "hotel", required: true },
     user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
 });


 // create the model for users and expose it to our app
 module.exports = mongoose.model('reservationhotel', hotelSchema);