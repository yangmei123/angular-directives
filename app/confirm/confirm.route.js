import angular from 'angular';
import uiRouter from 'angular-ui-router';

import confirmController from './confirm/confirm.controller';
import confirmTemplate from './confirm/confirm.html';

export default angular
  .module('app.confirm.route', [uiRouter, confirmController])
  .config(routeConfig)
  .name;

/* @ngInject */
function routeConfig($stateProvider) {
  $stateProvider
    .state('confirm', {
      url: '/confirm',
      template: confirmTemplate,
      controller: 'confirmController'
    });
}
