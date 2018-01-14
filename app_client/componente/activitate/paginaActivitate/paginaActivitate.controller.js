module.exports = function paginaActivitateCtrl($routeParams, proiect, activitate) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;
  vm.activitateId = $routeParams.activitateId;

  /* Cere detalii despre activitate si populeaza cu date. */
  proiect
    .infoProiect(vm.proiectId)
    .then(function(response) {
      vm.proiect = response.data.proiect;

      activitate
        .infoActivitate(vm.proiectId, vm.activitateId)
        .then(function(response) {
          vm.activitate = response.data.activitate;

          vm.activitateCod = vm.proiect.activitati.filter(function(activitate) {
            return activitate.activitateId === parseInt(vm.activitateId);
          })[0].cod;

          vm.antetActivitate = {
            titlu: vm.activitate.numeActivitate,
            cod: vm.activitateCod
          };

          vm.etapa = vm.proiect.etape.filter(function(etapa) {
            return etapa._id === vm.activitate.etapaId;
          })[0];

          proiect
            .membriProiect(vm.proiectId)
            .then(function(response) {
              var membri = response.data.membriProiect;

              vm.responsabil = membri.filter(function(membru) {
                return vm.activitate.responsabil === membru.userId;
              })[0];
            }, function(response) {
              return null;
            });

          activitate
            .listaStatus()
            .then(function(response) {
              vm.statusuri = response.data.listaStatus;

              vm.activitateStatus = vm.statusuri.filter(function(status) {
                return status.statusId === vm.activitate.status;
              })[0];
            }, function(response) {
              return null;
            });
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });

  vm.dateForm = {
    statusNou: ''
  };

  vm.confirmare = '';

  vm.onSubmit = function () {
    vm.formError = '';

    /** validare form status. */
    if (!vm.dateForm || !vm.dateForm.statusNou) {
      vm.formError = "Selecteaza un status!";
      return false;
    }
    
    else {
      vm.formError = '';
      vm.executaSchimbaStatus(vm.proiectId, vm.activitateId, vm.dateForm);
    }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de editare membru. */
  vm.executaSchimbaStatus = function(proiectId, activitateId, date) {
    activitate
      .schimbaStatus(proiectId, activitateId, date)
      .then(function(response) {
        vm.confirmare = response.data.message;

        vm.activitateStatus = vm.statusuri.filter(function(status) {
          return status.statusId === response.data.activitate.status;
        })[0];
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
