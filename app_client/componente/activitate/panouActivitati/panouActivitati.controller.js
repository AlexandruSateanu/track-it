module.exports = function panouActivitatiCtrl($routeParams, activitate) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;
  vm.faraActivitati = '';

  /* Cere lista activitati proiect. */
  activitate
    .listaActivitati(vm.proiectId)
    .then(function(response) {
      vm.activitati = response.data.listaActivitati;

      vm.antetPagina = {
        titlu: 'Panou Activitati'
      };
    }, function(response) {
      vm.faraActivitati = 'Proiectul nu are activitati momentan.'
    });
};
