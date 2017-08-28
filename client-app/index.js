import angular from 'angular';
import 'angular-route';

import config from './config/config';
import socketFactory from './factories/io.factory';
import userFactory from './factories/user.factory';

angular
  .module('app', ['ngRoute'])
  .config(config)
  .factory('io', socketFactory)
  .factory('user', userFactory);
