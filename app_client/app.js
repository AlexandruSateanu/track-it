var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-ui-bootstrap');
require('../production/templates/templateCachePartials');

angular.module('track-it', ['ngRoute', 'ngSanitize', 'trackitPartials', 'ui.bootstrap']);

function routeConfig($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'componente/home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm',
      necesitaUserNeconectat: true
    })
    .when('/panou-start', {
      templateUrl: 'componente/panouStart/panouStart.view.html',
      controller: 'panouStartCtrl',
      controllerAs: 'vm',
      necesitaAuthentificare: true
    })
    .when('/register', {
      templateUrl: 'componente/autentificare/register/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm',
      necesitaUserNeconectat: true
    })
    .when('/confirmare', {
      templateUrl: 'componente/autentificare/confirmare/confirmare.view.html',
      controller: 'confirmareCtrl',
      controllerAs: 'vm'
    })
    .when('/admin/creare-user', {
      templateUrl: 'componente/admin/creareUser/creareUser.view.html',
      controller: 'creareUserCtrl',
      controllerAs: 'vm',
      necesitaAuthentificare: true,
      necesitaAdmin: true
    })
    .when('/creare-proiect', {
      templateUrl: 'componente/proiect/creareProiect/creareProiect.view.html',
      controller: 'creareProiectCtrl',
      controllerAs: 'vm',
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/alege-etape', {
      templateUrl: 'componente/proiect/alegeEtape/alegeEtape.view.html',
      controller: 'alegeEtapeCtrl',
      controllerAs: 'vm',
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/alege-membri', {
      templateUrl: 'componente/proiect/alegeMembri/alegeMembri.view.html',
      controller: 'alegeMembriCtrl',
      controllerAs: 'vm',
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId', {
      templateUrl: 'componente/proiect/proiectStart/proiectStart.view.html',
      controller: 'proiectStartCtrl',
      controllerAs: 'vm',
      necesitaAccesProiect: true,
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/setari-proiect', {
      templateUrl: 'componente/proiect/setariProiect/setariProiect.view.html',
      controller: 'setariProiectCtrl',
      controllerAs: 'vm',
      necesitaAccesProiect: true,
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/creare-activitate', {
      templateUrl: 'componente/activitate/creareActivitate/creareActivitate.view.html',
      controller: 'creareActivitateCtrl',
      controllerAs: 'vm',
      necesitaAccesProiect: true,
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/activitate/:activitateId', {
      templateUrl: 'componente/activitate/paginaActivitate/paginaActivitate.view.html',
      controller: 'paginaActivitateCtrl',
      controllerAs: 'vm',
      necesitaAccesProiect: true,
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/activitate/:activitateId/editeaza-activitate', {
      templateUrl: 'componente/activitate/editeazaActivitate/editeazaActivitate.view.html',
      controller: 'editeazaActivitateCtrl',
      controllerAs: 'vm',
      necesitaAccesProiect: true,
      necesitaAuthentificare: true
    })
    .when('/proiect/:proiectId/activitate/:activitateId/creare-sarcina', {
      templateUrl: 'componente/sarcina/creareSarcina/creareSarcina.view.html',
      controller: 'creareSarcinaCtrl',
      controllerAs: 'vm',
      necesitaAccesProiect: true,
      necesitaAuthentificare: true
    })
    .when('/403', {
      templateUrl: 'componente/altele/pagina403/pagina403.view.html',
      controller: 'pagina403Ctrl',
      controllerAs: 'vm'
    })
    .when('/404', {
      templateUrl: 'componente/altele/pagina404/pagina404.view.html',
      controller: 'pagina404Ctrl',
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/404' });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

/* Verificare pentru permisiuni ale user-ului inainte de acesarea rutei. 
Rutele pot avea nevoie de user logat sau de acces la proiect (daca e ruta de proiect). */
function verificarePermisiuni($rootScope, $location, autentificare) {
  /* Evenimentul $routeChangeStart este emis inainte de schimbare unei rute. 
  In obiectul next avem informatii despre viitoarea ruta. */
  $rootScope.$on('$routeChangeStart', function (event, next) {
    var proiectId = next.params.proiectId;
    var rutaNoua = next.$$route;

    if (rutaNoua) {
      /* Folosim serviciul de autentificare cu metoda care verifica permisiuni. */
      var verificare = autentificare.verificaPermisiuniRuta(rutaNoua, proiectId);

      /* Cand functia returneaza obiect de tip promise, trebuie extras rezultatul cu then(). */
      if (typeof verificare === 'object') {
        verificare.then(function(rezultat) {
          if (!rezultat) {
            /* Daca userul nu are permisiuni, redirectare catre home. */
            event.preventDefault();
            $location.path('/');
          }
        });
      } 
      
      else {
        if (!verificare) {
          /* Daca userul nu are permisiuni, redirectare catre home. */
          event.preventDefault();
          $location.path('/');
        }
      }
  
      /* Userul logat nu trebuie sa poata accesa rutele pentru useri nelogati.
      Redirectare catre pagina de start a userului. */
      if (rutaNoua.necesitaUserNeconectat && autentificare.userConectat()) {
        event.preventDefault();
        $location.path('/panou-start');
      }
    }
  });
}

angular
  .module('track-it')
  .config(['$routeProvider', '$locationProvider', routeConfig])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .run(['$rootScope', '$location', 'autentificare', verificarePermisiuni]);

require('./servicii');
require('./comune');
require('./componente');
