app.controller('chatController', function($scope, $location, io, userInfo, $http, $window){

	$scope.sendEnter = function(c){
		if(c == 13){
			$scope.send();
		}
	};

	// function that scrolls has to use jQuery
	function scrollDown(){
		(function(){
			try{
				$('#msg-area').animate(
					{scrollTop: $('.msg').last().offset().top + ($('.msg').length * 100)}
				);
			} catch(e) {

			}
		})();
	}

	// if the user closes a window
	$window.onbeforeunload = function(){
		leave();
	}

	//offical leaving of the conversation
	function leave(){
		io.emit('user leaves', $scope.info.id);
	}

	// leave the conversation
	$scope.leaveConvo = function(){
		if(confirm('ok to leave conversation?')){
			leave();
			$location.url('/');
		}
	};

	// stop typing function
	function stopTyping(){
		io.emit('user stoped typing', $scope.info.id);
		$scope.selfTyping = false;
		$scope.typingMsgSent = false;
	}

	// notify of typing
	$scope.notifyTyping = function(){

		if($scope.comment.length >= 1){
			$scope.selfTyping = true;

		} else if($scope.selfTyping == 0){
			$scope.selfTyping = false;
		}

		if($scope.selfTyping == true && !$scope.typingMsgSent){
			io.emit('user typing', {nickName : $scope.info.nickName, id : $scope.info.id});
			$scope.typingMsgSent = true;

		} else if ($scope.selfTyping == false){
			stopTyping();
			$scope.typingMsgSent = false;
		}

	};

	// send the message to the server
	$scope.send = function(){
		toSend = {
			nickName: $scope.info.nickName,
			comment: $scope.comment,
			fontColor: $scope.info.fontColor,
			time: new Date(),
			borderColor: $scope.info.borderColor,
			backgroundColor: $scope.info.backgroundColor,
			imageUrl: $scope.info.imageUrl,
			font: $scope.info.font
		};
		io.emit('chat message', toSend);
		stopTyping();
		$scope.comment = "";
	};

	// user starts typing
	io.on('user typing', function(data){
		$scope.usersTyping = data;
	});

	// a user stops typing
	io.on('user stoped typing', function(data){
		$scope.usersTyping = data;
	});

	// push user comment to messages
	io.on('chat message', function(data){
		$scope.messages = data;
		scrollDown();
	});

	// user joins the conversation
	io.on('user joined', function(data){
		$scope.joinedUsers = data;
	});

	// when a user leaves the conversation
	io.on('user leaves', function(data){
		$scope.leftUsers.push(data[1]);
		$scope.joinedUsers = data[0];
	});

	// retrieve messages at the start
	io.on('get messages', function(data){
		$scope.messages = data;
	});

	// for setting up customization
	function custSetUp(){
		$scope.showActivity = true;
		$scope.showOnline = true;
	}

	// toggle customization show
	$scope.toggCustShow = function(toTog){
		switch(toTog){
			case 'activity':
				$scope.showActivity = ($scope.showActivity == true) ? false : true;
				break;
			case 'online':
				$scope.showOnline = ($scope.showOnline == true) ? false : true;
				break;
		}
	};

	function init(){
		$scope.comment = "";
		io.emit('get messages');
		$scope.joinedUsers = [];
		$scope.leftUsers = [];
		$scope.usersTyping = [];

		$scope.selfTyping = false;
		$scope.typingMsgSent = false;

		$scope.info = userInfo.getInfo();

		// give pseudo-unique id
		$http
			.get('http://localhost:3000/gen-id', {})
			.success(function(data){
				$scope.info.id = data;
				$scope.info.joined = new Date;
				// officially join the conversation
				io.emit('user joined', $scope.info);
		});

		// other setups
		custSetUp();
	}

	init();
});
