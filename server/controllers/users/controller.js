const userModel = require('../../models/user');
const jsonResponse = require('../../utils/jsonResponse');

module.exports = {

  indexAction ({ req, res, next }) {
    const response = jsonResponse({});
    (async () => {
      try {
        const users = await userModel.find();

        response.data = users;
        response.success = true;
      } catch (error) {
        response.message = `ERROR: unnable to fetch the users because ${error}`;
      } finally {
        res.json(response);
      }
    })();
  },

  addUser ({ req, res, next }) {
    const response = jsonResponse({});
    (async () => {
      try {
        const user = req.body.user;
        const newUser = await userModel.add(user);

        response.data = newUser;
        response.success = true;

        req.session.userId = newUser.id;
      } catch (error) {
        response.message = `ERROR: unnable to register the user because ${error}`;
      } finally {
        res.json(response);
      }
    })();
  }
};

