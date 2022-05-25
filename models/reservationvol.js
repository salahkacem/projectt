var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hotelSchema = new Schema({
     vol: { type: Schema.ObjectId, ref: "vol", required: true },
     user: { type: Schema.ObjectId, ref: "user", required: true },
 });


 // create the model for users and expose it to our app
 module.exports = mongoose.model('reservationvol', hotelSchema);