const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); 
const pluginManager = require('./pluginManagerInstance'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Use the routes from the index.js file
app.use('/', routes);

app.listen(port, () => {
  console.log(`Chat Messenger API listening at http://127.0.0.1:${port}`);
});