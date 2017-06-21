import angular from 'angular';
import uiRouter from 'angular-ui-router';

import alertController from './alert/alert.controller';
import alertTemplate from './alert/alert.html';

export default angular
  .module('app.channel.route', [uiRouter, alertController])
  .config(routeConfig)
  .name;

/* @ngInject */
function routeConfig($stateProvider) {
  $stateProvider
    .state('alert', {
      url: '/alert',
      template: alertTemplate,
      controller: 'alertController'
    });
}
