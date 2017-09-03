const userModel = require('../../models/user');
const jsonResponse = require('../../utils/jsonResponse');

module.exports = {
  clientRefresh ({ req, res, next }) {
    const response = jsonResponse({});
    (async () => {
      try {
        const updatedUser = await userModel.find(req.session.userId);

        response.data = updatedUser;
        response.success = true;

      } catch (error) {
        response.message = `ERROR: unnable to fetch the users because ${error}`;
      } finally {
        res.json(response);
      }
    })();
  }
};
