const jwt = require("jsonwebtoken")
async function authUser(req,res,next) {
    //step 1 get token 
    const token = req.cookies.token
    console.log("Token",token)
    //step two validate the token
    if(!token){
        return res.status(401).json({message :"token not found"})
    }

    try{

    //decod the token by verify method 
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if (decode.role !== "user"){
            return res.status(401).json({message :"you don't have acces to add items" })
            }
    
        req.user = decode

        next()

    }catch(err){
        console.log(err)
        return res.status.json(500).json({message:err.message})
    }

}

async function authseller(req,res,next){
    const token = req.cookies.token

    if (!token){
        res.status(401).json({message:"token not found"})
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(decode.role !=="seller"){
            res.status(401).json({message:"you have not buy anything"})
        }
        req.user = decode

        next()
    }catch(err){
        console.log(err)
        return res.status.json(500).json({message:err.message})
    }
}

module.exports = {authUser,authseller}
