var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('../production/templates/templateCachePartials');

angular.module('track-it', ['ngRoute', 'ngSanitize']);

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'componente/home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/panou-start', {
      templateUrl: 'componente/panou-start/panou-start.view.html',
      controller: 'panouStartCtrl',
      controllerAs: 'vm'
    })
    .when('/proiect-start', {
      templateUrl: 'componente/proiect-start/proiect-start.view.html',
      controller: 'proiectStartCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'auth/register/register.view.html',
      controller: 'registerCtrl',
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

require('./comune');
require('./auth');
require('./componente');
