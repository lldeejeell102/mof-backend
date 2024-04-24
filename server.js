const express = require('express')
// import express from 'express'
require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config()
const bodyParser = require('body-parser')
// import bodyParser from 'body-parser'
const userRouter = require('./controllers/user')
// import userRouter from './controllers/user.js'
const Message = require('./models/Message')
// import Message from './models/Message.js'
const messageRouter = require('./controllers/messages')
// import messageRouter from './controllers/messages.js'
const cors = require('cors')
// import cors from 'cors'


const mongoose = require('./models/connection')
// import mongoose from './models/connection.js'



const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/mof', messageRouter)
app.get('/', (req, res) => {
    res.send("your server is running... better catch it")
})

const PORT = process.env.PORT || 4321
app.listen(PORT, () => console.log(`now listening on port ${PORT}`))