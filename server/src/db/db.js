const mongoose = require("mongoose")

async function connectDb(){
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("datbase connected sucessfully")
    }catch(err){
        console.log("datbase connection error :",err);
    }
}

module.exports = connectDb