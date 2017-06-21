import angular from 'angular';

module.exports = angular
  .module('config', [])
  .factory('configs', configs)
  .name;

/* @ngInject */
function configs() {
  return {
    pageSize: 20
  };
}
