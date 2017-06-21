import angular from 'angular';

import config from '../app.config';
import operat from '../services/operation.service';
import dropDownMenu from './dropdown.directive';

/* eslint import/no-unresolved: 0 */
/* eslint import/imports-first: 0 */
import headerTpl from '!file!../layout/header.html';
import footerTpl from '!file!../layout/footer.html';
import menuTpl from '!file!../layout/menu.html';
import headImg from '!file!../assets/img/head.jpg';

module.exports = angular
  .module('app.index.login', [
    config,
    operat,
    dropDownMenu
  ])
  .controller('LoginController', LoginController)
  .name;

/* @ngInject */
function LoginController(
  configs,
  $rootScope,
  $scope,
  $http,
  $timeout,
  $interval,
  $location,
  operation,
  $window
) {
  $scope.headerUrl = headerTpl;
  $scope.footerUrl = footerTpl;
  $scope.sideUrl = menuTpl;
  $scope.imgUrl = headImg;
  $scope.userInfo = {};
  $scope.header_toggle = ($event) => {
    $event.stopPropagation();
    $scope.open = !$scope.open;
  };
  // 注销
  $scope.loginOut = () => {
    $window.localStorage.clear();
  };
  $scope.hideBox = () => {
    if ($scope.open === true) {
      $timeout(() => {
        $scope.open = false;
      }, 10);
    }
  };
  // 设置面包屑
  $scope.nav = {};
  $scope.nav.navText = $scope.nav.navText || '首页';
  const channelMeau = {
    module_name: '指令',
    link_url: ' javascript:; ',
    action: [{
      action_name: '提示',
      data: '/#/alert'
    }, {
      action_name: '确认框',
      data: '/#/confirm'
    }],
    class: 'glyphicon glyphicon-retweet'
  };
  const meau = {
    showMeau() {
      $scope.menuList = [channelMeau];
    }
  };
  meau.showMeau();
}
