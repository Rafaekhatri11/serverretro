const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const sendinvite = new Schema({

      
        email : String,
        admin : Boolean


})



module.exports = mongoose.model('sendinvite',sendinvite);