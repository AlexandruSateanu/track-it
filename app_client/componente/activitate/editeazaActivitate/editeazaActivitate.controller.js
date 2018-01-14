module.exports = function creareActivitateCtrl($routeParams, proiect, activitate, useri, $location) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;
  vm.activitateId = $routeParams.activitateId;

  activitate
    .infoActivitate(vm.proiectId, vm.activitateId)
    .then(function(response) {
      vm.activitate = response.data.activitate;

      vm.dateForm = {
        numeActivitate: vm.activitate.numeActivitate,
        responsabil: '',
        etapa: '',
        estimare: vm.activitate.estimare,
        descriere: vm.activitate.descriere
      };

      proiect
        .infoProiect(vm.proiectId)
        .then(function(response) {
          vm.proiect = response.data.proiect;

          vm.activitateCod = vm.proiect.activitati.filter(function(activitate) {
            return activitate.activitateId === parseInt(vm.activitateId);
          })[0].cod;

          vm.antetPagina = {
            titlu: 'Editeaza activitate',
            subtitlu: vm.activitateCod + ' - ' + vm.activitate.numeActivitate
          };

          vm.etapa = vm.proiect.etape.filter(function(etapa) {
            return etapa._id === vm.activitate.etapaId;
          })[0];
        }, function(response) {
          return null;
        });

      proiect
        .membriProiect(vm.proiectId)
        .then(function(response) {
          vm.membriProiect = response.data.membriProiect;

          vm.responsabil = vm.membriProiect.filter(function(membru) {
            return vm.activitate.responsabil === membru.userId;
          })[0];
        }, function(response) {
          return null;
        });
    }, function(response) {
      null
    });

  vm.confirmare = '';

  vm.onSubmit = function () {
    vm.formError = '';
    /** validare form */
    if (!vm.dateForm || !vm.dateForm.numeActivitate || !vm.dateForm.responsabil || !vm.dateForm.etapa || !vm.dateForm.estimare) {
      vm.formError = 'Unele campuri obligatorii nu sunt completate!';
      return false;
    }

    else if (isNaN(vm.dateForm.estimare)) {
      vm.formError = 'Estimarea trebuie sa fie un numar intreg!';
    }
    
    else {
      vm.dateForm.responsabil = vm.dateForm.responsabil.userId;
      vm.formError = '';
      vm.executaEditare(vm.proiectId, vm.activitateId, vm.dateForm);
    }
  };

  /* Functie care foloseste serviciul de activitate cu functia lui de editare. */
  vm.executaEditare = function(proiectId, activitateId, date) {
    activitate
      .editeazaActivitate(proiectId, activitateId, date)
      .then(function(response) {
        vm.confirmare = response.data.message;
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
