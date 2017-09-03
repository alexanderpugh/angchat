const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
  controller.indexAction({ req, res });
});

router.post('/', (req, res) => {
  controller.addUser({ req, res });
});

router.get('/update', (req, res) => {
  controller.updateUser({ req, res });
});

module.exports = {
  path: '/users',
  router
};
