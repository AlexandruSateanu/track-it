var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-ui-bootstrap');
require('../production/templates/templateCachePartials');

angular.module('track-it', ['ngRoute', 'ngSanitize', 'trackitPartials', 'ui.bootstrap']);

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
    .when('/register', {
      templateUrl: 'auth/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/proiect-start', {
      templateUrl: 'componente/proiect/proiectStart/proiectStart.view.html',
      controller: 'proiectStartCtrl',
      controllerAs: 'vm'
    })
    .when('/creare-proiect', {
      templateUrl: 'componente/proiect/creareProiect/creareProiect.view.html',
      controller: 'creareProiectCtrl',
      controllerAs: 'vm'
    })
    .when('/alege-perioada', {
      templateUrl: 'componente/proiect/alegePerioada/alegePerioada.view.html',
      controller: 'alegePerioadaCtrl',
      controllerAs: 'vm'
    })
    .when('/alege-etape', {
      templateUrl: 'componente/proiect/alegeEtape/alegeEtape.view.html',
      controller: 'alegeEtapeCtrl',
      controllerAs: 'vm'
    })
    .when('/alege-membri', {
      templateUrl: 'componente/proiect/alegeMembri/alegeMembri.view.html',
      controller: 'alegeMembriCtrl',
      controllerAs: 'vm'
    })
    .when('/setari-proiect', {
      templateUrl: 'componente/proiect/setariProiect/setariProiect.view.html',
      controller: 'setariProiectCtrl',
      controllerAs: 'vm'
    })
    .when('/proiect/:proiectId/creare-activitate', {
      templateUrl: 'componente/activitate/creareActivitate/creareActivitate.view.html',
      controller: 'creareActivitateCtrl',
      controllerAs: 'vm'
    })
    .when('/proiect/:proiectId/activitate/:activitateId', {
      templateUrl: 'componente/activitate/paginaActivitate/paginaActivitate.view.html',
      controller: 'paginaActivitateCtrl',
      controllerAs: 'vm'
    })
    .when('/proiect/:proiectId/activitate/:activitateId/creare-sarcina', {
      templateUrl: 'componente/sarcina/creareSarcina/creareSarcina.view.html',
      controller: 'creareSarcinaCtrl',
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
  .config(['$routeProvider', '$locationProvider', config])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);

require('./comune');
require('./auth');
require('./componente');
