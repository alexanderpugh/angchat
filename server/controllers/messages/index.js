const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  next();
});

router.post('/', (req, res, next) => {
  next();
});

module.exports = {
  path: '/messages',
  router,
  socketActions: controller.socketActions
};
