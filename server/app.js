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
app.use(messagesController.path, messagesController.router);

// HTML5 mode
app.all('/*', (req, res) => {
  res.sendfile('public/index.html');
});

io.on('connection', (client) => {
  messagesController.socketActions({ io, client });
});

httpServer.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
