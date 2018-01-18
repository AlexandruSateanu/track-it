module.exports = function panouStartCtrl(autentificare, useri) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Panou start'
  };

  vm.faraProiecte = '';
  vm.faraActivitati = '';

  var userId = autentificare.userCurrent().userId;

  /* Apelam serviciul user si cerem lista proiectelor userului. */
  useri
    .listaProiecteUser(userId)
      .then(function(response) {
        vm.proiecteleMele = response.data.listaProiecte;

        if (vm.proiecteleMele.length <= 0) {
          vm.faraProiecte = 'Momentan nu aveti niciun proiect.'
        }
      }, function(response) {
        vm.faraProiecte = 'A intervenit o eroare cu obtinerea proiectelor.';
      });

  useri
    .listaActivitatiUser(userId)
    .then(function(response) {
      var activitatileMele = response.data.listaActivitatiUser;

      if (activitatileMele.length <= 0) {
        vm.faraActivitati = 'Momentan nu aveti activitati.'
      }

      activitatileMele.sort(function(a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      activitatileMele.splice(5);

      useri
        .listaProiecteUser(userId)
        .then(function(response) {
          var listaProiecte = response.data.listaProiecte;

          activitatileMele.forEach(function(activitate, index, activitati) {
            var proiectGasit = listaProiecte.filter(function(proiect) {
              return activitate.proiectId === proiect._id;
            })[0];

            activitati[index].cod = proiectGasit.cheieProiect + '-' + activitate._id;
          });

          vm.activitatileMele = activitatileMele;
        }, function(response) {
          return null;
        });
    }, function(response) {
      vm.faraActivitati = 'A intervenit o eroare cu obtinerea activitatilor.';
    });
}
