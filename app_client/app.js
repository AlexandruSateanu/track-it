var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('../dist/templates/templateCachePartials');

angular.module('track-it', ['ngRoute', 'ngSanitize']);

function config($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'pages/home/home.view.html',
      controller: 'homeCtrl',
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

require('./common/directives');
require('./pages');
