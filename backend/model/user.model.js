const mongoose = require("mongoose")

//schema

const userSchema = mongoose.Schema({
    // name  : {type : String , required : true},
    // email  : {type : String , required : true},
    // password  : {type : String , required : true}
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    confirm_password : String
})

//model

const UserModel = mongoose.model("user" , userSchema)

module.exports={
    UserModel
}