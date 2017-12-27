module.exports = function alegeEtapeCtrl(proiect, $location, $routeParams,$rootScope) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege etapele proiectului'
  };

  vm.dateForm = [{
    numeEtapa: '',
    dataStart: '',
    dataSfarsit: ''
  }];

  var proiectId = $routeParams.proiectId;

  /* Nu permite accesarea paginii de alegere etape cand nu este activ procesul de creare. */
  $rootScope.$watch(function() {
    return $location.path(); 
  }, function() { 
    if ($rootScope.proiectInCreare != proiectId) {
      $location.path('/404');  
    }  
  });

  vm.formError = '';

  vm.adaugaEtapa = function () {
    vm.formError = '';
    vm.dateForm.push({});
  };
    
  vm.stergeEtapa = function(pozitieEtapa) {
    if (vm.dateForm.length < 2) {
      vm.formError = 'Trebuie aleasa cel putin o etapa!';
    } 
    
    else {
      vm.formError = '';
      vm.dateForm.splice(pozitieEtapa, 1);
    }
  };

  /* Initializeaza valori predefinite pentru perioadele etapelor. */
  var dataMinima = new Date();
  var dataMaxima = new Date(2050, 5, 22);

  /* Cere detalii despre proiect si salveaza perioada reala a proiectului
  in variabilele definite mai sus. */
  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      dataMinima = response.data.proiect.dataStart;
      dataMaxima = response.data.proiect.dataSfarsit;

      /* Optiuni pentru directiva Angular de alegere date. */
      vm.dateOptiuni = {
        formatYear: 'yy',
        minDate: new Date(dataMinima),
        maxDate: new Date(dataMaxima),
        startingDay: 1
      };
    }, function(response) {
      return null;
    });

  vm.onSubmit = function () {
    var campGol = 0;
    var perioadaGresita = 0;


    /** validare form: daca exista campuri goale sau perioada gresita */
    for (var i = 0; i < vm.dateForm.length; i++) {
      if (!vm.dateForm[i].numeEtapa|| !vm.dateForm[i].dataStart || !vm.dateForm[i].dataSfarsit) {
        campGol++
      } 
      
      else if (vm.dateForm[i].dataStart.getTime() >= vm.dateForm[i].dataSfarsit.getTime()) {
        perioadaGresita++;
      }
    }

    if (!vm.dateForm || campGol > 0) {
      vm.formError = "Toate campurile trebuie completate!";
      return false;
    } 
    
    else if (perioadaGresita > 0) {
      vm.formError = "Datele de sfarsit trebuie sa fie mai mari ca datele de start!";
      return false;
    }

    else {
      vm.formError = '';
      vm.executaAlegereEtape(proiectId, angular.toJson(vm.dateForm));
    }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de alegere etape. */
  vm.executaAlegereEtape = function(proiectId, date) {
    proiect
      .alegeEtape(proiectId, date)
      .then(function(response) {
        $location.path('/proiect/' + proiectId + '/alege-membri');      
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
