module.exports = function editeazaPerioadaCtrl(proiect, $routeParams, $window) {
  var vm = this;

  var proiectId = $routeParams.proiectId;
  
  /* Cere detalii despre proiect si extrage perioada. */
  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      vm.dataStartCurenta = response.data.proiect.dataStart;
      vm.dataSfarsitCurenta = response.data.proiect.dataSfarsit;
    }, function(response) {
      return null;
    });

  vm.dateForm = {
    dataStart: '',
    dataSfarsit: ''
  };

  vm.confirmare = '';

  vm.perioadaOnSubmit = function () {
    vm.formError = '';
    
    /* validare form */
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
      vm.executaEditarePerioada(proiectId, angular.toJson(vm.dateForm));
    }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de editare perioada. */
  vm.executaEditarePerioada = function(proiectId, date) {
    proiect
      .editarePerioada(proiectId, date)
      .then(function(response) {
        vm.confirmare = response.data.message;
        $window.location.reload();
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
