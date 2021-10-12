const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('chat message', msg); // This will emit the event to all connected sockets
      });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});