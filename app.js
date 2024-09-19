const express = require("express")
const app = express()
const router = require('./src/routes/api')
const bodyParser = require('body-parser')

// BASIC LIB IMPORT
const cors = require("cors")
const hpp =  require("hpp")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const rateLimit = require("express-rate-limit")

// DATABASE IMPORT
const mongoose = require("mongoose")

// SECURITY MIDDLEWARE IMPLEMENTATION
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(helmet())
app.use(hpp())
app.use(mongoSanitize())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))

// BODY PARSER IMPLEMENT
app.use(bodyParser.json())

// APPLICATION BROWSING LIMIT IMPLEMENT
const limiter = rateLimit({windowMs: 15*60*1000, max: 1000})
app.use(limiter)

// DATABASE CONNECTION
mongoose.connect("mongodb+srv://prodhanr72:praCticE&DB6969@practice.rtc86.mongodb.net/practice").then((res) => {
    console.log('Database connected leh')
})
.catch((err) => {
    console.log('MongoDB connection failed!')
})

// ROUTING IMPLEMENT
app.use("/api/v1", router)

// 404 NOT FOUND
app.use("*", (req, res) => {
    res.status(404).json({status: '404', data: 'Not found !'})
})

module.exports = app;