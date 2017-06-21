import angular from 'angular';
import alert from '../../directives/alert.directive.js';

export default angular
  .module('app.c.alert', [alert])
  .controller('alertController', alertController)
  .name;

/* @ngInject */
function alertController($scope) {
  $scope.alertData = {
    type: 'alert-danger', // 提醒框样式成功alert-success
    msg: '备注不能为空！',
    alertShow: false
  };

  $scope.showAlert = () => {
    $scope.alertData.alertShow = true;
  };
}
