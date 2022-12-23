const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var chatMessages = []

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: { from : ' + msg.name + " , text :" + msg.text + " }");
    });
    socket.on('assign username', (msg) => {
        console.log('was asked to assign a username')
        socket.emit('assign username', "guest"+Math.floor(Math.random() * 10000));
    });
    socket.on('get chat history', (msg) => {
      console.log('chat history was requested')
      socket.emit('get chat history', chatMessages);
  });
  });

io.on('connection', (socket) => {
    
  });

app.get('/*', express.static('public_html'))

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg.name+" : "+msg.text);
      chatMessages.push( msg.name+" : "+msg.text)
    });
  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});