module.exports = function panouActivitatiCtrl($routeParams, activitate, useri) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;
  vm.faraActivitati = '';

  vm.antetPagina = {
    titlu: 'Panou Activitati'
  };

  /* Cere lista activitati proiect. */
  activitate
    .listaActivitati(vm.proiectId)
    .then(function(response) {
      var activitati = response.data.listaActivitati;

      useri
        .listaUseri()
        .then(function(response) {
          var useri = response.data.listaUseri;

          activitati.forEach(function(activitate, index, activitatiModificate) {
            var responsabil = useri.filter(function(user) {
              return user.userId === activitate.responsabil;
            })[0];

            activitatiModificate[index].numeResponsabil = responsabil.numeIntreg;
          });

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
        }, function(response) {
          return null;
        });
    }, function(response) {
      vm.faraActivitati = 'Proiectul nu are activitati momentan.'
    });
};
