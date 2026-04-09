const userModel = require("../models/user.model.js")
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(req,res){

    const{email,password,role="user"}=req.body

    const isUserAlreadyexist = await userModel.findOne({
        email
    })

    if(isUserAlreadyexist){
        res.status(409).json({message:"user is already exists"})
    }

    const hash = await bcrypt.hash(password,10)
    // haa jo samsj padu ema kevu hoy aa bcrypt 6ne 2 parameter le ek to password ne biju round mtlb ketla round var tu password ne hash karis like first round ma 123 nu 321 that pachi second ma vahdare em em 10 round vage ne vadhare encrpted that jay pass amuk loko 8 le amuk loko 10 sauthi saru 10 and aa bcrypt e SHA256 algo use kare atle 
    
    const user = await userModel.create({
        email,
        password:hash,
        role
    })

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)
 
    res.status(201).json({
        message:"user created sucessfully",
        user
    })

}


async function loginUser(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        res.status(409).json({message:"please sign up"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    
    if(!isPasswordValid){
        res.status(409).json({message:"enter correct information"})
    }

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"welcome you login sucessfully",
        user
    })
}



module.exports = {registerUser,loginUser}
