const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Email:{
        type:String,
        unique:true,
        required:true
    },
    LastName:{
        type:String,
    },
    FirstName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
        unique:true
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel