var mongoose = require('mongoose');



 var hotelSchema = mongoose.Schema({
    name: {
        type:String,
        minlength : 5,
        maxlength : 50,
        required : true
    },
     description: {
         type:String,
         required : true
     },
     image: {
         type:String,
         required : true
     },
     rate: {
         type:Number,
         required : true
     },
    place: {
        type:String,
        minlength : 5,
        maxlength : 50,
        required : true
    },
    price: {
        type:Number,
        maxlength :8,
        required : true
    },


 
 });
 
 


 // create the model for users and expose it to our app
 module.exports = mongoose.model('hotel', hotelSchema);