var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('../dist/templates/templateCachePartials');

angular.module('track-it', ['ngRoute', 'ngSanitize']);

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'components/home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/dashboard', {
      templateUrl: 'components/dashboard/dashboard.view.html',
      controller: 'dashboardCtrl',
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

angular
  .module('track-it')
  .config(['$routeProvider', '$locationProvider', config]);

require('./shared');
require('./components');
