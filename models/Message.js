const mongoose = require('./connection.js')

const {Schema, model} = mongoose

const messageSchema = new Schema ({
    message: String,
    username: String
}, {timestamps: true})

const Message = model("Message", messageSchema)

module.exports = Message