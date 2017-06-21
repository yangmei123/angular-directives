import angular from 'angular';
import uiRouter from 'angular-ui-router';

import loginController from './login.controller';
import indexController from './index.controller';
import indexTpl from './index.html';

module.exports = angular
  .module('app.index.route', [uiRouter, loginController, indexController])
  .config(routeConfig)
  .name;

/* @ngInject */
function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  // $urlRouterProvider.otherwise('/');
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('index', {
      url: '/login',
      template: indexTpl,
      controller: 'IndexController'
    });
}
