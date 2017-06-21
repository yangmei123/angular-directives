// data.msg 显示的文言
// data.show 是否显示确认框
// confirmFail 确认后控制器要执行的操作
import angular from 'angular';

import confirmTpl from './confirm.html';

module.exports = angular.module('app.directives.confirm', [])
  .directive('confirm', confirmDirective)
  .name;

/* @ngInject */
function confirmDirective() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      confirmOk: '&'
    },
    replace: true,
    template: confirmTpl,
    link(scope) {
      scope.close = () => {
        scope.data.show = false;
      };
      scope.$watch('data', () => {
        if (scope.data) {
          scope.data.show = scope.data.show || false;
        }
      }, true);
      scope.confirm = () => {
        scope.data.show = false;
        scope.confirmOk();
      };
    }
  };
}
