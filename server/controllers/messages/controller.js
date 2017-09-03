const messageModel = require('../../models/message');
const jsonResponse = require('../../utils/jsonResponse');

module.exports = {

  indexAction ({ req, res, next }) {
    const response = jsonResponse();
    (async () => {
      try {
        const messages = await messageModel.find();

        response.data = messages;
        response.success = true;
      } catch (error) {
        response.message = `ERROR: unnable to fetch the messages because ${error}`;
      } finally {
        res.json(response);
      }
    })();
  },

  addMessage ({ req, res, next }) {
    const response = jsonResponse();
    (async () => {
      try {
        const message = req.body.message;
        const newMessage = await messageModel.add(message);

        response.data = newMessage;
        response.success = true;
      } catch (error) {
        response.message = `ERROR: unnable to add the message because ${error}`;
      } finally {
        res.json(response);
      }
    })();
  },

  socketActions ({ io, client}) {
    client.on('NEW_MESSAGE_ADDED', (request) => {
      (async () => {
        try {
          const message = request.message;
          const newMessage = await messageModel.add(message);
          const messages = await messageModel.find();

          io.emit('NEW_MESSAGE_ADDED', messages);
        } catch (error) {
          console.error(`ERROR: ${error}`);
        }
      })();
    });
  }
};

