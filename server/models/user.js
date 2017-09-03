const Sequelize = require('Sequelize');

const connection = require('../config/connection');

const User = connection.define('user', {
  nickName: Sequelize.STRING,
  fontColor: Sequelize.STRING,
  backgroundColor: Sequelize.STRING,
  outlineColor: Sequelize.STRING,
  avatar: Sequelize.STRING,
  online: { type: Sequelize.BOOLEAN, defaultValue: true },
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});

const isValid = (user) => {
  if (!user.nickName) {
    return false;
  }

  if (!user.fontColor) {
    return false;
  }

  if (!user.backgroundColor) {
    return false;
  }

  if (!user.outlineColor) {
    return false;
  }

  if (!user.avatar) {
    return false;
  }

  return true;
};

module.exports.add = async (user) => {
  try {

    if (!isValid(user)) {
      throw new Error('ERROR: the user is not valid');
    }

    const newUser = await User.create({
      nickName: user.nickName,
      fontColor: user.fontColor,
      backgroundColor: user.backgroundColor,
      outlineColor: user.outlineColor,
      avatar: user.avatar
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (id = null) => {
  try {
    const method = id === null ? 'findAll' : 'findById';
    const result = await User[method](id === null ? {} : id);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports.User = User;

User.sync({
  force: true
});
