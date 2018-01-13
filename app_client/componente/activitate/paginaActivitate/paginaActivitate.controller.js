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
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });

  // vm.onSubmit = function () {
  //   vm.formError = '';

  //   /** validare form */
  //   if (!vm.perioadaRealizata || !vm.perioadaRealizata.dataStart || !vm.perioadaRealizata.dataSfarsit) {
  //     vm.formError = "Alege ambele date!";
  //     return false;
  //   }
    
  //   else {
  //     vm.formError = '';
  //     console.log(vm.perioadaRealizata);
  //     return false;
  //   }
  // };
};
