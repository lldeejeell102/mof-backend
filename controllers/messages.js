const express = require('express')
const Message = require('../models/Message')
const verifyJWT = require('../utils/middleware')
const OpenAI = require('openai')
require('dotenv').config()

const router = express.Router()


// MIDDLEWARE
// Checking to see if you're logged in
router.use(verifyJWT)

// ROUTES
router.get('/protected', verifyJWT, async (req, res, Message) => {
    try {
        const userusername = req.user.username;
        const messages = await Message.find({ username });

        res.json({ message: "Welcome, " + req.user.name, messages });
    } catch (error) {
        console.log("---", error.message, "----");
        res.status(400).send('error, read logs for details');
    }
});


// Show - Get
router.get('/', verifyJWT, async (req, res) => {
    try {
        const username = req.query.username;
        console.log(username)
        const message = await Message.find({username: username});

        if (!message) {
            return res.status(404).send('Message not found');
        }

        res.json({ message });
    } catch (error) {
        console.log("----", error.message, "----");
        res.status(400).send('error, read logs for details');
    }
});


// Create - Post
router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        req.body.userId = username;

        const createdMessage = await Message.create(req.body);

        const openai = new OpenAI({
            apiKey: process.env.OPEN_API_KEY
        })

        async function getFriendResponse(message){
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: message}],
                model: "gpt-3.5-turbo"
            })
            return completion.choices[0].message.content
        }

        const friendResponse = await getFriendResponse(createdMessage.message)
        res.json({ message:'Message from friend', message: createdMessage, friendResponse})

        // res.json({ message: 'Message created successfully', message: createdMessage });
    } catch (error) {
        console.log("----", error.message, "----");
        res.status(400).send('error, read logs for details');
    }
});

// Update - PUT
router.put('/:id', verifyJWT, async (req, res) => {
    try {
        const updatedMessage = req.body.updateMessage
        const id = req.params.id
        const message = await Message.findByIdAndUpdate(id, {message: updatedMessage});
        res.send('updated')
        
        if (!message) {
            return res.status(404).send('Message not found');
        }
    } catch (error) {
        console.log("----", error.message, "----");
        res.status(400).send('error, read logs for details');
    }
});


// Delete - DELETE
router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        const id = req.params.id
        const message = await Message.findByIdAndDelete({_id: id});
        res.send('deleted')

        if (!message) {
            return res.status(404).send('Message not found');
        }
    } catch (error) {
        console.log("----", error.message, "----");
        res.status(400).send('error, read logs for details');
    }
});


module.exports = router