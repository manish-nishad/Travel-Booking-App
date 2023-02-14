require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authController = require("./Controllers/authController")
const dotenv = require("dotenv").config()
const app = express()

// connect database
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL, () => console.log("DB is successfully connected"))

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authController)

const port = process.env.PORT || 8080

//start our server
app.listen(port, () => console.log("Server is running..."))

//module