var mongoose = require('mongoose');

 
 var volSchema = mongoose.Schema({
    startPlace: {
        type:String,
        required : true
    },
     distination: {
        type:String,
        required : true
    },
     returnVol: {
         type:Boolean,
         required : true
     },
    date: {
        type: Date,
        default: Date.now,
    },
     price: {
        type:Number,
        required : true
    },

 
 });
 
 


 // create the model for users and expose it to our app
 module.exports = mongoose.model('vol', volSchema);