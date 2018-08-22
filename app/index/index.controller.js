import angular from 'angular';

import config from '../app.config';
import operat from '../services/operation.service';
import calendar from '../directives/attendance-calendar';
import './assets/style.css';

module.exports = angular
  .module('app.index.index', [config, operat, calendar])
  .controller('IndexController', IndexController)
  .name;

/* @ngInject */
function IndexController($scope) {
  $scope.today = new Date();
  $scope.calendarData = {};
  $scope.nextMonth = () => {
    $scope.calendarData.nextMonth = true;
  };
  $scope.tMonth = () => {
    $scope.calendarData.tMonth = true;
  };
  $scope.preMonth = () => {
    $scope.calendarData.preMonth = true;
  };
}

