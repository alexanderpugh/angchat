const Sequelize = require('Sequelize');

const connection = require('../config/connection');
const user = require('./user');

const Message = connection.define('message', {
  userId: Sequelize.INTEGER,
  content: Sequelize.STRING,
  posted: Sequelize.DATE,
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});

const isValid = (message) => {
  if (!message.content) {
    return false;
  }

  if (!message.userId) {
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
      userId: message.userId,
      content: message.content,
      posted: new Date().toString()
    });

    return newMessage;
  } catch (error) {
    throw error;
  }
};

module.exports.find = async (id = null) => {
  try {
    const method = id === null ? 'findAll' : 'findById';
    let result;

    if (method === 'findAll') {
      result = await Message.findAll({
        include: {
          model: user.User
        }
      });

    } else if (method === 'findById') {
      result = await Message.findById(id);
      result.user = await user.find(result.userId);
    } else {
      throw new Error('ERROR: invalid method supplied to message.find');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

Message.belongsTo(user.User);

Message.sync({
  force: true
});
