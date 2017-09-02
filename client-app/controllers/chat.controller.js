import {
  USER_JOINED_CHAT,
  USER_LEFT_CHAT,
  USER_STOPPED_TYPING,
  USER_TYPING,
  NEW_MESSAGE_ADDED,
  MESSAGES_LOADED
} from '../config/ioActions';

function generateChatObject () {
  return {
    members: [],
    usersTyping: [],
    message: []
  };
}

export default ['$location', 'io', 'user', '$window',
  function ($location, io, user, $window) {

    const vm = this;

    io.on(USER_TYPING, (data) => {
      vm.usersTyping = data;
    });

    io.on(USER_STOPPED_TYPING, (data) => {
      vm.usersTyping = data;
    });

    io.on(NEW_MESSAGE_ADDED, (messages) => {
      console.log('messages: ', messages);//DEBUG
      vm.messages = messages;
      //scrollDown();
    });

    io.on(USER_JOINED_CHAT, (data) => {
      vm.joinedUsers = data;
      console.log('data: ', data);//DEBUG
    });

    io.on(USER_LEFT_CHAT, (data) => {
      vm.leftUsers.push(data[1]);
      vm.joinedUsers = data[0];
    });

    io.on(MESSAGES_LOADED, (data) => {
      vm.messages = data;
    });

    $window.onbeforeunload = () => {
      leave();
    };

    vm.sendEnter = function (c) {
      if (c === 13) {
        vm.send();
      }
    };

    vm.leaveConvo = function () {
      if (confirm('ok to leave conversation?')) {
        leave();
        $location.url('/');
      }
    };

    vm.notifyTyping = function () {
      if (vm.comment.length >= 1) {
        vm.selfTyping = true;

      } else if (vm.selfTyping == 0) {
        vm.selfTyping = false;
      }

      if (vm.selfTyping == true && !vm.typingMsgSent) {
        io.emit(USER_TYPING, { nickName: vm.info.nickName, id: vm.info.id });
        vm.typingMsgSent = true;

      } else if (vm.selfTyping == false) {
        stopTyping();
        vm.typingMsgSent = false;
      }
    };

    vm.send = () => {
      const toSend = {
        nickName: vm.info.nickName,
        comment: vm.comment,
        fontColor: vm.info.fontColor,
        time: new Date(),
        borderColor: vm.info.borderColor,
        backgroundColor: vm.info.backgroundColor,
        imageUrl: vm.info.imageUrl,
        font: vm.info.font
      };
      io.emit(NEW_MESSAGE_ADDED, toSend);
      stopTyping();
      vm.comment = "";
    };

    vm.toggCustShow = (toTog) => {
      switch (toTog) {
        case 'activity':
          vm.showActivity = (vm.showActivity == true) ? false : true;
          break;
        case 'online':
          vm.showOnline = (vm.showOnline == true) ? false : true;
          break;
      }
    };

    function leave() {
      io.emit(USER_LEFT_CHAT, vm.info.id);
    }

    function stopTyping() {
      io.emit(USER_STOPPED_TYPING, vm.info.id);
      vm.selfTyping = false;
      vm.typingMsgSent = false;
    }

    function scrollDown() { /**/
      (function () {
        try {
          $('#msg-area').animate(
            { scrollTop: $('.msg').last().offset().top + ($('.msg').length * 100) }
          );
        } catch (e) {

        }
      })();
    }

    function custSetUp() {
      vm.showActivity = true;
      vm.showOnline = true;
    }

    function init() {
      vm.user = user;
      console.log('user: ', user);//DEBUG
      user.refresh((err) => {
        if (!err) {
          console.log('user: ', user);//DEBUG
          io.emit(NEW_MESSAGE_ADDED, {
            message: {
              content: 'a new message',
              userID: user.info.id
            }
          });//DEBUG
        }
      });

      /*
      vm.comment = "";
      io.emit(MESSAGES_LOADED);
      vm.joinedUsers = [];
      vm.leftUsers = [];
      vm.usersTyping = [];

      vm.selfTyping = false;
      vm.typingMsgSent = false;

      vm.info = user.getInfo();

      io.emit(USER_JOINED_CHAT, vm.info);

      custSetUp();
      */
    }

    init();
  }];
