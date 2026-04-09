const productModel = require("../models/product.model")
const {uploadFile} = require("../services/storage.service")

async function createProduct(req,res){
    const {title , description, price} = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const product = await productModel.create({
        url : result.url,
        title : title,
        description : description,
        price: price,
        created_by: req.user.id
    })

    return res.status(201).json({
        message :"product created sueccfully",
        product

    })
//
}

async function deleteProduct(req,res) {
    //step one get id from params 
    const id = req.params.id

    const is_exist =await productModel.findById(
        id
    )
  

    if(!is_exist){
        return res.status(409).json({message:"not any product exist"})
    }

    if(req.user.id != is_exist.created_by){
        return res.status(409).json({message:"you have not access to delete product"})
    }

    await productModel.findByIdAndDelete(id) 

    return res.status(409).json({
        message:"product deleted successufully"
    })
    
}

async function editProduct(req,res){
    const id = req.params.id
    const {title,description,price} = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const is_exist = await productModel.findById(
        id
    )
    if(!is_exist){
        return res.status(409).json({message:"not any product exist"})
    }
    if (req.user.id != is_exist.created_by){
        return res.status(409).json({message:"you have not access to delete product"})
    }

    await productModel.findByIdAndUpdate(id,{url:result.url,title:title,description:description,price:price })

    return res.status(200).json({message:"product update sucessfully"})

}

async function getAllproducts(req,res){
    const products = await productModel.find()
    return res.status(200).json({
        message:"fetched sucessfully",
        products:products
    })
}

module.exports = {createProduct,deleteProduct,editProduct,getAllproducts}