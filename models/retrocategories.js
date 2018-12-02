const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const retrocategories = new Schema({

            retroadmin:String,   
            retrocategory1 : String ,
            retrocategory2 : String,
            retrocategory3 : String ,
            retrocategory4 : String
})



module.exports = mongoose.model('retrocategories',retrocategories);