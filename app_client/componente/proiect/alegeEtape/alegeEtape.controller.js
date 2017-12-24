module.exports = function alegeEtapeCtrl(proiect, $location, $routeParams) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege etapele proiectului'
  };

  vm.dateForm = [{
    numeEtapa: '',
    dataStart: '',
    dataSfarsit: ''
  }];

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

  vm.onSubmit = function () {
    var campGol = 0;
    var perioadaGresita = 0;

    var proiectId = $routeParams.proiectId;

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
