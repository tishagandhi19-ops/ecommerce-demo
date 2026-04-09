const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get  ("/seeproducts", authMiddleware.authUser,userController.getAllProducts)
router.post  ("/add-to-cart", authMiddleware.authUser,userController.addToCart)
router.get  ("/seecart", authMiddleware.authUser,userController.getCart)
router.delete("/deletecart/:id",authMiddleware.authUser,userController.removeCartProduct)
router.patch("/editcart/:id",authMiddleware.authUser,userController.editcart)

module.exports= router