import angular from 'angular';
import alertTpl from './alert.html';

import './style.scss';

module.exports = angular
  .module('app.directives.alert', [])
  .directive('alert', alertDirective)
  .name;
/* @ngInject */
function alertDirective($log, $document, $timeout) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    replace: true,
    template: alertTpl,
    link(scope) {
      scope.$watch('data', () => {
        if (scope.data === undefined) {
          scope.data = {};
        } else {
          scope.alertShow = scope.data.alertShow;
          scope.msg = scope.data.msg;
          scope.type = scope.data.type;
          if (scope.data.alertShow === true) {
            $timeout(() => {
              scope.data.alertShow = false;
            }, 3000);
          }
        }
      }, true);
      scope.closeAlert = () => {
        scope.data.alertShow = false;
      };
    }
  };
}
