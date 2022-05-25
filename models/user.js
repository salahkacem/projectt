/**
 * Created by daninux on 24/03/14.
 */
 var mongoose = require('mongoose');
 var bcrypt   = require('bcrypt-nodejs');
 
 var userSchema = mongoose.Schema({
    firstname: {
        type:String,
        minlength : 5,
        maxlength : 50,
        required : true
    },
    lastname: {
        type:String,
        minlength : 5,
        maxlength : 50,
        required : true
    },
    phonenumber: {
        type:String,
        maxlength :8,
        required : true
    },
    email: {
        type:String,
        required : true
    },
    password: {
        type:String,
        required : true
    },
    role: {
        type:String,
        required : true
    },
 
 });
 
 
 // methods ======================
 // generating a hash for encrypting password's users
 userSchema.methods.generateHash = function(password) {
     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 };
 
 // Return 0 si son iguales y otro valor en cualquier otro caso.
 userSchema.methods.validPassword = function(password) {
     return bcrypt.compareSync(password, this.password);
 };
 
 // create the model for users and expose it to our app
 module.exports = mongoose.model('user', userSchema);