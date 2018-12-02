const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    email:String,
    password:String,
    firstname:String,
    lastname:String,
    userStatus:String
})

const Registration = mongoose.model('registration',RegistrationSchema,'registration');

module.exports = {
    Registration
}