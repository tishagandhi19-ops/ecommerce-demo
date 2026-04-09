const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    product :{
       type:mongoose.Schema.Types.ObjectId,// av route na hoy tisha su su/ see product / add to cart avo rte na hoy hoy oto a 2 min santi saru karo  w2 min
               ref:"product",
               required :true
    },
    qauntity : {
        type : Number,
        required : true
    },
    price :{
        type : Number,
        required: true
    }
})

const cartSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
               ref:"user",
               required :true
    },
    totalCartAmount : {
        type : Number,
        required :true
    },
    items : [cartItemSchema] 
})

const cartModel = mongoose.model("cart",cartSchema)

module.exports = cartModel

 