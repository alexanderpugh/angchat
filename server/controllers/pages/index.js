const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  next();
});

router.get('/online', (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/');
  }
});

router.get('/client-refresh', (req, res) => {
  controller.clientRefresh({ req, res });
});

module.exports = {
  path: '/',
  router
};
