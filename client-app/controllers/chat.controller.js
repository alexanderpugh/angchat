export default ['$location', 'io', 'user', '$window', 'messages',
  function ($location, io, user, $window, messages) {

    const vm = this;

    io.on('NEW_MESSAGE_ADDED', (messages) => {
      vm.messages = messages;
      scrollDownToLatestComment();
    });

    vm.sendMessage  = () => {
      io.emit('NEW_MESSAGE_ADDED', {
        message: {
          content: vm.tempMessage.content,
          userId: user.info.id
        }
      });
      resetTempMessage();
    };

    function scrollDownToLatestComment() {
      setTimeout(() => {
        const messagesBox = document.querySelector(".messages");
        messagesBox.scrollTop = messagesBox.scrollHeight + 100;
      }, 100);
    }

    function resetTempMessage () {
      vm.tempMessage = {
        content: ''
      };
    }

    function fetchMessages () {
      messages.fetch((err, messages) => {
        if (!err) {
          vm.messages = messages;
          scrollDownToLatestComment();
        }
      });
    }

    function init() {
      vm.user = user;
      user.refresh((err) => {
        if (!err) {
          resetTempMessage();
          fetchMessages();
        }
      });
    }

    init();
  }];
