import angular from 'angular';

import dropdownTpl from './dropdown.html';

module.exports = angular
  .module('app.index.dropdown', [])
  .directive('dropDownMenu', dropDownMenu)
  .name;

/* @ngInject */
function dropDownMenu($location) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: dropdownTpl,
    link(scope) {
      scope.onClick = (item) => {
        if (item.isActive === true) {
          item.isActive = false;
        } else {
          angular.forEach(scope.data, (data) => {
            data.isActive = false;
          });
          item.isActive = true;
        }
      };
      scope.liClick = (item, $event) => {
        $event.stopPropagation();
        if (item.isActive === true) {
          item.isActive = false;
        } else {
          angular.forEach(scope.data, (data) => {
            angular.forEach(data.action, (mdata) => {
              mdata.isActive = false;
              if (parseInt(mdata.id, 0) === parseInt(item.id, 0)) {
                data.isActive = true;
              }
            });
          });
          item.isActive = true;
        }
      };
      // 页面刷新时显示所在的菜单栏
      let href = $location.path();
      scope.$watch('data', (nv) => {
        if (nv) {
          angular.forEach(scope.data, (menu) => {
            angular.forEach(menu.action, (submenu) => {
              if (submenu.data === '') {
                submenu.data = `${menu.link_url}?c=${menu.module}&a=${submenu.action}`;
              }
            });
          });
        }
        angular.forEach(scope.data, (data) => {
          if (data.link_url.substring(2) === href) {
            data.isActive = true;
          }
          angular.forEach(data.action, (mdata) => {
            if (mdata.data.substring(2) === href) {
              data.isActive = true;
              mdata.isActive = true;
            }
          });
        });
      });
    }
  };
}
