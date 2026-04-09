const productModel = require("../models/product.model")
const cartModel = require("../models/addcart.model")

async function getAllProducts(req,res) {//?
    const products = await productModel.find()
    return res.status(200).json({
        message:"fetched sucessfully",
        products :products
    })
}

async function addToCart ( req , res ){
//get user id
    const userId = req.user.id
     // get product id and qauntity 
    const { product , qauntity} = req.body;
    // find product for id reciveed form body 
   const founded_product =  await productModel.findById(product)
    // return if not found 
   if(!founded_product){
    return res.status(409).json({message :"this product not found"}) }
// find cart for loggedin user 
let cart = await cartModel.findOne({
    user : userId
}).populate("user","email role").populate("items.product") 
  // if not cart then create cart and add item  
if(!cart){
 // create a cart 
    cart = new cartModel({
        user : userId,
        items : [{
            product : product, 
            qauntity,
            price : founded_product.price
        }] 
    })
}else {
    // already created then check weather the product in cart already exists 
    const itemIndex = cart.items.findIndex(
        item => item.product._id.toString() === product
    ) 
    
    if(itemIndex > -1){
        cart.items[itemIndex].qauntity += qauntity // increase qauntity 
    } else {
        // not present in cart then push the whole item into cart 
        cart.items.push({
            product,
            qauntity,
            price : founded_product.price
        });
    }
}


// recalculate the total amount 
 cart.totalCartAmount = cart.items.reduce(
    (total,item) => total + item.qauntity * item.price
, 0 )
// save the cart 
await cart.save()

// send the res 
res.status(200).json({
    message : "Action done sucuesfully",
    cart
}) 
} 

async function getCart(req,res){
    const userId = req.user.id //ave res mokl ha 
    let cart = await cartModel.findOne({
    user : userId
}).populate("user","email role").populate("items.product") 

return res.status(200).json({
    message:"fetched sucessfully",
    cart 
})
}

async function removeCartProduct(req,res){
    const id = req.params.id
    const user_id = req.user.id
    const {product} = req.body

    const cart = await cartModel.findById(
        id
    )
    if (!cart){
        return res.status(409).json({message:"not any cart found"})
    }
    if(user_id.toString() != cart.user.toString()){
        return res.status(409).json({message :"you have not access to delete cart"})
    }

    // 🔥 Remove specific product from items array
    cart.items = cart.items.filter(
        item => item.product.toString() !== product.toString()
    );

    cart.totalCartAmount = cart.items.reduce(
    (total,item) => total + item.qauntity * item.price, 0 )
    // save the cart 
    await cart.save()

    return res.status(409).json({message :"deleted sucessfully",cart});
}

async function editcart(req,res){
    const id = req.params.id;
    const {product,qauntity} = req.body;

    const cart = await cartModel.findById(id);
    if(!cart){
        return res.status(409).json({message:"you have not this cart"})
    }

    if (cart.user.toString() != req.user.id.toString()){
        return res.status(409).json({message:"you not access to edit cart"})
    }

    cart.items = cart.items.map((item)=> {
        if(item.product.toString() === product.toString())
            item.qauntity = qauntity
    } )

    cart.totalCartAmount = cart.items.reduce(
    (total,item) => total + item.qauntity * item.price, 0 )
    await cart.save()
    return res.status(409).json({message :"edit sucessfully",cart});

}

module.exports = {getAllProducts,addToCart,getCart,removeCartProduct,editcart}