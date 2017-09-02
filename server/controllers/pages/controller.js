const userModel = require('../../models/user');
const jsonResponse = require('../../utils/jsonResponse');

module.exports = {
  clientRefresh ({ req, res, next }) {
    const response = jsonResponse({});
    (async () => {
      try {
        console.log('req.session.userID:', req.session.userID);//DEBUG
        const updatedUser = await userModel.find(req.session.userID);

        response.data = updatedUser;
        response.success = true;

        console.log('updatedUser: ', updatedUser);//DEBUG
      } catch (error) {
        response.message = `ERROR: unnable to fetch the users because ${error}`;
      } finally {
        res.json(response);
      }
    })();
  }
};
