import angular from 'angular';

import config from '../app.config';
import operat from '../services/operation.service';
import './assets/style.css';

module.exports = angular
  .module('app.index.index', [config, operat])
  .controller('IndexController', IndexController)
  .name;

/* @ngInject */
function IndexController($scope) {
}
