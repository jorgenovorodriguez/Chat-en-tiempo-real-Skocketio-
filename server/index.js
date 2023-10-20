const { log } = require('console');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('message', (body) => {
        console.log(body);
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6),
        });
    });
});

server.listen(4000);
console.log('server on port', 4000);
