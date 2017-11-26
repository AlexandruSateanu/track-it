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
      templateUrl: 'componente/panouStart/panouStart.view.html',
      controller: 'panouStartCtrl',
      controllerAs: 'vm'
    })
    .when('/proiect-start', {
      templateUrl: 'componente/proiectStart/proiectStart.view.html',
      controller: 'proiectStartCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'auth/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/creare-proiect', {
      templateUrl: 'componente/creareProiect/creareProiect.view.html',
      controller: 'creareProiectCtrl',
      controllerAs: 'vm'
    })
    .when('/setari-proiect', {
      templateUrl: 'componente/setariProiect/setariProiect.view.html',
      controller: 'setariProiectCtrl',
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
