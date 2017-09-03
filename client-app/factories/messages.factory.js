export default ['$http', function ($http) {
  const messages = {};

  messages.fetch = (callback) => {
    $http
      .get('/messages')
      .then((response) => {
        if (response.data.success) {
          callback(null, response.data.data);
        } else {
          throw new Error('ERROR: unable to fetch the messages');
        }
      })
      .catch((data) => {
        console.error(`ERROR: ${data}`);
        callback(data);
      });
  };

  return messages;
}];
