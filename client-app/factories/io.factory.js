export default ['$rootScope', function ($rootScope) {
  const socket = window.io.connect('http://localhost:3000');

  return {
    on (eventName, callback) {
      socket.on(eventName, () => {
        const args = arguments;
        $rootScope.$apply(() => {
          callback.apply(socket, args);
        });
      });
    },

    emit (eventName, data, callback) {
      socket.emit(eventName, data, () => {
        var args = arguments;
        $rootScope.$apply(() => {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}];
