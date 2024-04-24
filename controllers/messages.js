const express = require('express')
const Message = require('../models/Message')
const verifyJWT = require('../utils/middleware')

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
        const username = req.body.username;
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
        res.json({ message: 'Message created successfully', message: createdMessage });
    } catch (error) {
        console.log("----", error.message, "----");
        res.status(400).send('error, read logs for details');
    }
});

module.exports = router