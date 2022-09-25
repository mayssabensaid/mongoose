const mongoose = require ('mongoose')


const userSchema = mongoose.Schema({
name : {
    type : String ,
    required : true
},
age : Number ,
favoriteFoods :  [String] 

})
module.exports = mongoose.model('user' , userSchema)