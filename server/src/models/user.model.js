const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        require : true,
        unique : true
    },

    password :{
        type: String,
        require : true
    },

    role:{
        type:String,
         enum : ["user","seller"],
        defult:"user",      
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel


