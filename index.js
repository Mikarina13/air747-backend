// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Basic route to test your server
app.get('/', (req, res) => {
    res.send('AIR747 Backend is up and running!');
});

// Updated route for OpenAI API Chat Completion call
app.post('/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error contacting OpenAI.');
    }
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('AIR747 Backend listening on port 3000.');
});
