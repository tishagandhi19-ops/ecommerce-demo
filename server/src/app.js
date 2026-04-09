const express = require("express")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const userRoutes = require("./routes/user.routes")
const app = express()
const cookieParser = require("cookie-parser")

app.use(express.json())

app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/product",productRoutes)
app.use("/api/user",userRoutes)

//get var ane mar ne gori Aa cat nu kar ne test yaar are tisha pn user na ekey nai chalta 

module.exports = app;

