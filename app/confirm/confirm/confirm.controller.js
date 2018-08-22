import angular from 'angular';
import confirm from '../../directives/confirm.directive.js';

export default angular
  .module('app.c.confirm', [confirm])
  .controller('confirmController', confirmController)
  .name;

/* @ngInject */
function confirmController($scope) {
  $scope.nav.navText = '确认弹窗';
  $scope.confirmData = {};
  $scope.showConfirm = () => {
    $scope.confirmData.show = true;
    $scope.confirmData.msg = '是否确定删除？';
  };
  $scope.delete = () => {
    $scope.alertData = {
      type: 'alert-success', // 提醒框样式成功alert-success
      msg: '这里可以执行删除的任务啦！',
      alertShow: true
    };
  };
}
