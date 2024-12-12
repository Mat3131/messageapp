const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Un utente si è connesso');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);  // Invia a tutti gli utenti
    });

    socket.on('disconnect', () => {
        console.log('Un utente si è disconnesso');
    });
});

server.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000');
});
