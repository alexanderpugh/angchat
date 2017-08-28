import avatars from '../config/avatars';

export default [function () {
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
      id: null
    };
  }

  // TODO join chat front and back
  user.joinChat = (callback) => {};

  if (!user.initialized) {
    user.clear();
    user.initialized = true;
  }

  return user;
}];
