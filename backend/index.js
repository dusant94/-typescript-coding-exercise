const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let messages = [
  { message: 'Hello world!', user: 'Ana', timestamp: new Date().toISOString() },
  { message: 'Hi', user: 'Bob', timestamp: new Date().toISOString() }
];

app.get('/messages', (req, res) => {
  res.status(200).json(messages);
});

app.post('/message/send', (req, res) => {
  const { message, user } = req.body;
  if (!message || !user) {
    return res.status(400).send('Bad request, invalid input');
  }

  const newMessage = {
    message,
    user,
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);
  res.status(204).send('Message sent successfully');
});

app.listen(port, () => {
  console.log(`Chat Messenger API listening at http://127.0.0.1:${port}`);
});