const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const http = require('http');
const socketIO = require('socket.io');

const usersController = require('./controllers/users');
const pagesController = require('./controllers/pages');
const messagesController = require('./controllers/messages');

const app = express();
const httpServer = http.Server(app);
const io = socketIO(httpServer);
const port = 3000;

const msgs = [];
const users = [];
const usersTyping = [];
const userData = [];
let userNo = 0;

app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(pagesController.path, pagesController.router);
app.use(usersController.path, usersController.router);

// HTML5 mode
app.all('/*', (req, res) => {
  res.sendfile('public/index.html');
});

io.on('connection', (client) => {
  messagesController.socketActions({ io, client });
/*
  // user joined conversation
  socket.on('USER_JOINED_CHAT', (data) => {
    users.push(data);

    io.emit('USER_JOINED_CHAT', users);
    userNo++;

    console.log('users: ', users);//DEBUG
  });

  // user leaves the conversation
  socket.on('USER_LEFT_CHAT', (id) => {
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
    io.emit('USER_LEFT_CHAT', [users, left]);
  });
/*
  // receive a message
  socket.on('NEW_MESSAGE_ADDED', (msg) => {
    msgs.push(msg);
    io.emit('NEW_MESSAGE_ADDED', msgs);
  });

  // inform that a user is typing
  socket.on('USER_TYPING', (data) => {
    usersTyping.push(data);
    io.emit('USER_TYPING', usersTyping);
  });

  // when a user stops typing
  socket.on('USER_STOPPED_TYPING', (id) => {
    for (i = 0; i < usersTyping.length; i++) {
      if (usersTyping[i].id == id) {
        usersTyping.splice(i, 1);
        break;
      }
    }

    io.emit('USER_STOPPED_TYPING', usersTyping);
  });
/*
  // send user the past messages
  socket.on('NEW_MESSAGE_ADDED', () => {
    io.emit('NEW_MESSAGE_ADDED', msgs)
  });*/
});

httpServer.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
