const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
  controller.indexAction({ req, res });
});

module.exports = {
  path: '/messages',
  router,
  socketActions: controller.socketActions
};
