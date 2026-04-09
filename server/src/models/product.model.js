const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    url:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
    type: Number,
    required: true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required :true
    }
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel

