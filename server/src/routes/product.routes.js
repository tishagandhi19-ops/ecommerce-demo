const express = require("express")
const router = express.Router()
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware")
const productController = require("../controllers/product.controller")


const upload = multer({
   storage: multer.memoryStorage()
})

router.post("/createproduct",authMiddleware.authseller,upload.single("image"),productController.createProduct)

router.delete("/delete-product/:id",authMiddleware.authseller,productController.deleteProduct)
router.patch("/edit-product/:id",authMiddleware.authseller,upload.single("image"),productController.editProduct)
router.get("/get-products",authMiddleware.authseller,productController.getAllproducts)
module.exports = router
