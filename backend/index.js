const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); 
const pluginManager = require('./pluginManagerInstance'); 
const WebSocket = require('ws');  // Import WebSocket library

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Use the routes from the index.js file
app.use('/', routes);

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

});

app.server = app.listen(port, () => {
  console.log(`Chat Messenger API listening at http://127.0.0.1:${port}`);
});
// Upgrade the HTTP server to handle WebSocket connections
app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});