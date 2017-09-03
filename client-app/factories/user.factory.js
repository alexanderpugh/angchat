import avatars from '../config/avatars';

export default ['$http', function ($http) {
  const user = {};

  user.initialized = false;

  user.getInfo = () => user.info;

  user.setInfo = (inserted) => user.info = inserted;

  user.clear = () =>{
    user.info = {
      nickName: "anonymous",
      font: 'inherit',
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      outlineColor: '#000000',
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      online: false,
      id: null
    };
  }

  user.refresh = (callback) => {
    if (user.info.id === true) {
      callback(null);
    } else {
      $http
        .get('/client-refresh')
        .then((response) => {
          user.info = response.data.data;
          callback(null);
        })
        .catch((reponse) => {
          console.error(`ERROR: unable to refresh the user because ${response}`);
          callback(true);
        });
    }
  };

  user.joinChat = (callback) => {
    $http
      .post('/users/', {
        user: user.info
      })
      .then((response) => {
        if (response.data.success) {
          user.info = response.data.data;
          callback(null);
        } else {
          console.error('ERROR: uable to join the chat');
          callback(true);
        }
      })
      .catch((response) => {
        console.error(`ERROR: unable to join the chat because of: ${response.data.message}`);
        callback(true);
      });
  };

  if (!user.initialized) {
    user.clear();
    user.initialized = true;
  }

  return user;
}];
