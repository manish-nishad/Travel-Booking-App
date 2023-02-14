const express = require("express")
const mongoose = require("mongoose")
const authController = require("./Controllers/authController")
const dotenv = require("dotenv").config()
const app = express()

//connect database
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL, () => console.log("DB is successfully connected"))

//middleware
app.use("/auth", authController)

//start our server
app.listen(process.env.PORT, () => console.log("Server is running..."))

//module