import setupController from '../controllers/setup.controller';
import setupView from '../views/setup.view';
import chatController from '../controllers/chat.controller';
import chatView from '../views/chat.view';

export default ['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      template: setupView,
      controller: setupController,
      controllerAs: 'vm'
    })

    .when('/online', {
      controller: chatController,
      template: chatView
    })

    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
}];
