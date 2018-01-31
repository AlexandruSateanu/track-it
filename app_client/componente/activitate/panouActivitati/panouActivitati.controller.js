module.exports = function panouActivitatiCtrl($routeParams, activitate) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;
  vm.faraActivitati = '';

  /* Cere lista activitati proiect. */
  activitate
    .listaActivitati(vm.proiectId)
    .then(function(response) {
      var activitati = response.data.listaActivitati;

      vm.activitatiPlanificate = activitati.filter(function(activitate) {
        return activitate.status === 0;
      });

      vm.activitatiInAsteptare = activitati.filter(function(activitate) {
        return activitate.status === 1;
      });

      vm.activitatiInExecutie = activitati.filter(function(activitate) {
        return activitate.status === 2;
      });

      vm.activitatiInEvaluare = activitati.filter(function(activitate) {
        return activitate.status === 3;
      });

      vm.activitatiFinalizate = activitati.filter(function(activitate) {
        return activitate.status === 4;
      });
      
      vm.antetPagina = {
        titlu: 'Panou Activitati'
      };
    }, function(response) {
      vm.faraActivitati = 'Proiectul nu are activitati momentan.'
    });
};
