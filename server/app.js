const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const app = express();
const httpServer = http.Server(app);
const io = socket(httpServer);
const port = 3000;

const msgs = [];
const users = [];
const usersTyping = [];
const userData = [];
let userNo = 0;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/gen-id', (req, res) => {
  res.json(userNo);
});

app.get('/user-data', (req, res) => {
  res.json(userData);
});

// HTML5 mode
app.all('/*', function (req, res) {
  res.sendfile('public/index.html');
});

io.on('connection', (socket) => {
  // user joined conversation
  socket.on('user joined', (data) => {
    users.push(data);

    io.emit('user joined', users);
    userNo++;
  });

  // user leaves the conversation
  socket.on('user leaves', (id) => {
    let left = {};

    for (i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        left = users.splice(i, 1)[0];
        break;
      }
    }

    for (i = 0; i < usersTyping.length; i++) {
      if (usersTyping[i].id === id) {
        left = usersTyping.splice(i, 1)[0];
        break;
      }
    }

    left.left = new Date();
    io.emit('user leaves', [users, left]);
  });

  // receive a message
  socket.on('chat message', (msg) => {
    msgs.push(msg);
    io.emit('chat message', msgs);
  });

  // inform that a user is typing
  socket.on('user typing', (data) => {
    usersTyping.push(data);
    io.emit('user typing', usersTyping);
  });

  // when a user stops typing
  socket.on('user stoped typing', (id) => {
    for (i = 0; i < usersTyping.length; i++) {
      if (usersTyping[i].id == id) {
        usersTyping.splice(i, 1);
        break;
      }
    }

    io.emit('user stoped typing', usersTyping);
  });

  // send user the past messages
  socket.on('get messages', () => {
    io.emit('get messages', msgs)
  });
});

httpServer.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
