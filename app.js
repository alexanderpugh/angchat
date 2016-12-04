var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// global variables - default when server starts up
var msgs = [];
var users = [];
var usersTyping = [];
var userNo = 0;


// return the number of users as an id
app.get('/gen-id', function(req, res){
	res.end(JSON.stringify(userNo));
});


// get all the current users data
var userData = [];
app.get('/user-data', function(req, res){
	res.end(JSON.stringify(userData));
});

// handle socket.io events below
io.on('connection', function(socket){

	// user joined conversation
	socket.on('user joined', function(data){
		users.push(data);

		io.emit('user joined', users);
		userNo++;
	});

	// user leaves the conversation
	socket.on('user leaves', function(id){

		var left = {};

		for(i = 0; i < users.length; i++){
			if(users[i].id == id){
				var left = users.splice(i, 1)[0];
				break;
			}
		}

		for(i = 0; i < usersTyping.length; i++){
			if(usersTyping[i].id == id){
				var left = usersTyping.splice(i, 1)[0];
				break;
			}
		}

		left.left = new Date();
		io.emit('user leaves', [users, left]);
	});

	// receive a message
	socket.on('chat message', function(msg){
		msgs.push(msg);
		io.emit('chat message', msgs);
	});

	// inform that a user is typing
	socket.on('user typing', function(data){
		usersTyping.push(data);
		io.emit('user typing', usersTyping);
	});

	// when a user stops typing
	socket.on('user stoped typing', function(id){
		for(i = 0; i < usersTyping.length; i++){
			if(usersTyping[i].id == id){
				usersTyping.splice(i, 1);
				break;
			}
		}
		io.emit('user stoped typing', usersTyping);
	});

	// send user the past messages
	socket.on('get messages', function(){
		io.emit('get messages', msgs)
	});
});

// 404 redirect to home
app.use(function(req, res){
	res.redirect('/');
});


// start server
http.listen(3000, function(){
	console.log('listening on port 3000');
});
