import angular from 'angular';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import './assets/css/reset.css';
import './assets/css/admin.min.css';
import './assets/css/skins/all-skins.min.css';
import './assets/css/style.css';

import index from './index/index.module';
import alert from './alert/alert.module';
import confirm from './confirm/confirm.module';

angular.module('app', [
  index,
  alert,
  confirm
]);
