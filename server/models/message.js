const Sequelize = require('Sequelize');

const connection = require('../config/connection');

const Message = connection.define('message', {
  userID: Sequelize.INTEGER,
  content: Sequelize.STRING,
  posted: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});

const isValid = (message) => {
  if (!message.userID) {
    return false;
  }

  if (!message.content) {
    return false;
  }

  return true;
};

module.exports.add = async (message) => {
  try {

    if (!isValid(message)) {
      throw new Error('ERROR: the message is not valid');
    }

    const newMessage = await Message.create({
      userID: message.userID,
      content: message.content,
      posted: new Date().toString()
    });

    console.log('newly created message: ', newMessage);//DEBUG
    return newMessage;
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (id = null) => {
  try {
    const method = id === null ? 'findAll' : 'findById';
    const result = await Message[method](id === null ? {} : id);

    return result;
  } catch (error) {
    throw error;
  }
};

Message.sync({
  force: false
});
