const mongoose = require('mongoose')
//define schema
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    service:String
})
//create model object
const UserModel = new mongoose.model("Users",UserSchema)
module.exports=UserModel