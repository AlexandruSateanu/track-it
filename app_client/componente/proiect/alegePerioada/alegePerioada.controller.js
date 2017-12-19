module.exports = function alegePerioadaCtrl(proiect, $location, $routeParams) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege perioada proiectului'
  };

  vm.dateForm = {
    dataStart: '',
    dataSfarsit: ''
  };

  vm.proiectId = $routeParams.proiectId;

  vm.onSubmit = function () {
    vm.formError = '';
    /** validare form */
    if (!vm.dateForm || !vm.dateForm.dataStart || !vm.dateForm.dataSfarsit) {
      vm.formError = "Alege ambele date!";
      return false;
    } 
    
    else if (vm.dateForm.dataStart.getTime() >= vm.dateForm.dataSfarsit.getTime()) {
      vm.formError = "Data de sfarsit trebuie sa fie mai mare ca data de start!";
      return false;
    }

    else {
      vm.formError = '';
      vm.executaAlegerePerioada(vm.proiectId, vm.dateForm);
    }
  };

  vm.executaAlegerePerioada = function(proiectId, dateForm) {
    proiect
      .alegePerioada(proiectId, dateForm)
      .then(function(response) {
        vm.confirmare = response.data.message;

      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
