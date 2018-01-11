var activitatiRecente = [
  {
    cod: "PR1-ACT2",
    numeActivitate: "Activitate 2",
    idProiect: 1
  },
  {
    cod: "PR1-ACT1",
    numeActivitate: "Activitate 1",
    idProiect: 1
  },
  {
    cod: "PR2-ACT4",
    numeActivitate: "Activitate 4",
    idProiect: 2
  },
  {
    cod: "PR2-ACT3",
    numeActivitate: "Activitate 3",
    idProiect: 2
  }
];

var activitateaMea = [
  {
    cod: "PR2-ACT2",
    numeActivitate: "Activitatea Mea 2",
    idProiect: 2
  },
  {
    cod: "PR2-ACT1",
    numeActivitate: "Activitatea Mea 1",
    idProiect: 2
  }
];

module.exports = function panouStartCtrl(autentificare, useri) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Panou start'
  };

  vm.faraProiecte = '';

  var userId = autentificare.userCurrent().userId;

  /* Apelam serviciul user si cerem lista proiectelor userului. */
  useri
    .listaProiecteUser(userId)
      .then(function(response) {
        var proiecteleMele = response.data.listaProiecte;

        if (proiecteleMele.length <= 0) {
          vm.faraProiecte = 'Momentan nu aveti niciun proiect.'
        }

        else {
          vm.proiecteleMele = response.data.listaProiecte;
        }
      }, function(response) {
        vm.faraProiecte = 'A intervenit o eroare cu obtinerea proiectelor.';
      });

  vm.activitatiRecente = activitatiRecente;

  vm.activitateaMea = activitateaMea;
}
