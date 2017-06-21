import angular from 'angular';

module.exports = angular.module('app.services.operation', [])
  .factory('operation', operationDatas)
  .name;
/* @ngInject */
function operationDatas($http) {
  const listFactory = {
    getHttp(url, param) {
      return $http.get(url, param);
    },
    postHttp(url, param) {
      return $http.post(url, param);
    }
  };
  return listFactory;
}
