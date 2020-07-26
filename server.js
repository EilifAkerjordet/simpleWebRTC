const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const Socket = require('socket.io');

const io = Socket(server);

const port = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const rooms = {};

io.on('connection', socket => {
  socket.on('join room', roomID => {
    if (rooms[roomID]) {
      // Joins existing room with socket ID
      rooms[roomID].push(socket.id);
    } else {
      // Creates new room with socket ID
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].find(id => id !== socket.id);
    if (otherUser) {
      socket.emit('other user', otherUser);
      socket.to(otherUser).emit('user joined', socket.id);
    }
  });

  socket.on('offer', payload => {
    io.to(payload.target).emit('offer', payload);
  });

  socket.on('answer', payload => {
    io.to(payload.target).emit('answer', payload);
  });

  socket.on('ice-candidate', incoming => {
    io.to(incoming.target).emit('ice-candidate', incoming.candidate);
  });
});

server.listen(port, () => console.log(`server listening on port ${port}`));
