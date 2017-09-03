import angular from 'angular';
import 'angular-route';

import config from './config/config';
import socketFactory from './factories/io.factory';
import userFactory from './factories/user.factory';
import messagesFactory from './factories/messages.factory';
import ngEnter from './directives/ngEnter.directive';

angular
  .module('app', ['ngRoute'])
  .directive('ngEnter', ngEnter)
  .config(config)
  .factory('io', socketFactory)
  .factory('user', userFactory)
  .factory('messages', messagesFactory);
