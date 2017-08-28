export default ['$scope', '$location', 'io', 'user', '$http', '$window',
  function ($scope, $location, io, user, $http, $window) {

  $scope.sendEnter = function (c) {
    if (c == 13) {
      $scope.send();
    }
  };

  function scrollDown () {
    (function () {
      try {
        $('#msg-area').animate(
          { scrollTop: $('.msg').last().offset().top + ($('.msg').length * 100) }
        );
      } catch (e) {

      }
    })();
  }

  $window.onbeforeunload = () => {
    leave();
  };

  function leave () {
    io.emit('user leaves', $scope.info.id);
  }

  $scope.leaveConvo = function () {
    if (confirm('ok to leave conversation?')) {
      leave();
      $location.url('/');
    }
  };

  function stopTyping () {
    io.emit('user stoped typing', $scope.info.id);
    $scope.selfTyping = false;
    $scope.typingMsgSent = false;
  }

  $scope.notifyTyping = function () {
    if ($scope.comment.length >= 1) {
      $scope.selfTyping = true;

    } else if ($scope.selfTyping == 0) {
      $scope.selfTyping = false;
    }

    if ($scope.selfTyping == true && !$scope.typingMsgSent) {
      io.emit('user typing', { nickName: $scope.info.nickName, id: $scope.info.id });
      $scope.typingMsgSent = true;

    } else if ($scope.selfTyping == false) {
      stopTyping();
      $scope.typingMsgSent = false;
    }
  };

  $scope.send = () => {
    const toSend = {
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

  io.on('user typing', (data) => {
    $scope.usersTyping = data;
  });

  io.on('user stoped typing', (data) => {
    $scope.usersTyping = data;
  });

  io.on('chat message', (data) => {
    $scope.messages = data;
    scrollDown();
  });

  io.on('user joined', (data) => {
    $scope.joinedUsers = data;
  });

  io.on('user leaves', (data) => {
    $scope.leftUsers.push(data[1]);
    $scope.joinedUsers = data[0];
  });

  io.on('get messages', (data) => {
    $scope.messages = data;
  });

  function custSetUp () {
    $scope.showActivity = true;
    $scope.showOnline = true;
  }

  $scope.toggCustShow = (toTog) => {
    switch (toTog) {
      case 'activity':
        $scope.showActivity = ($scope.showActivity == true) ? false : true;
        break;
      case 'online':
        $scope.showOnline = ($scope.showOnline == true) ? false : true;
        break;
    }
  };

  function init () {
    $scope.comment = "";
    io.emit('get messages');
    $scope.joinedUsers = [];
    $scope.leftUsers = [];
    $scope.usersTyping = [];

    $scope.selfTyping = false;
    $scope.typingMsgSent = false;

    $scope.info = user.getInfo();

    $http
      .get('/gen-id')
      .then((data) => {
        console.log(data);//DEBUG
        $scope.info.id = data.data;
        $scope.info.joined = new Date;

        io.emit('user joined', $scope.info);
      });

    custSetUp();
  }

  init();
}];
