const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const setretro = new Schema({

    useruid : String,
    retroadmin:String,   
    projectname : String,
    roomcode: String,
    templatename : String,
    shareablelink:String,
    retrocategory1 : String,
    retrocategory2: String,
    retrocategory3 : String,
    retrocategory4: String,
    startTime : String,
    Endtime : String,
    startdate: String,
    Enddate: String,
    repeatevery : String,
    Endson : String,
    Email : Array,
    createdat : String
 

})



module.exports = mongoose.model('setretro',setretro);