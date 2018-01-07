var activitatiRecente = [
  {
    cod: "PR1-ACT2",
    numeActivitate: "Activitate 2",
    idProiect: 1,
    data: "23 03 2016, 11:00"
  },
  {
    cod: "PR1-ACT1",
    numeActivitate: "Activitate 1",
    idProiect: 1,
    data: "23 03 2016, 10:00"
  }
];

/*
var statistici = {
  status: [
    {
      nume: "deschise",
      valoare: 5
    },
    {
      nume: "in curs",
      valoare: 3
    },
    {
      nume: "in analiza",
      valoare: 2
    },
    {
      nume: "terminate",
      valoare: 10
    }
  ],
  prioritate: [
    {
      nume: "scazuta",
      valoare: 4
    },
    {
      nume: "medie",
      valoare: 10
    },
    {
      nume: "majora",
      valoare: 9
    },
    {
      nume: "urgenta",
      valoare: 2
    }
  ]
};
*/

var membri = [
  {
    id: 1,
    nume: 'Cristina Ungureanu'
  },
  {
    id: 2,
    nume: 'Alex Sateanu'
  },
  {
    id: 3,
    nume: 'Andreea Ujica'
  },
  {
    id: 4,
    nume: 'Bogdan Chircu'
  },
  {
    id: 5,
    nume: 'Test Test'
  }
];

module.exports = function proiectStartCtrl($scope, creareProiectActiva, $routeParams, proiect, useri) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;

  /* Deoarece proiectul a fost deja creat, putem bloca accesul la toate rutele de creare. */
  $scope.creareProiectActiva = creareProiectActiva;
  $scope.creareProiectActiva = {};

  vm.activitatiRecente = activitatiRecente;

  /*
  vm.statisticiStatus = statistici.status;

  vm.statisticiPrioritate = statistici.prioritate;
  */

  /* Cere detalii despre proiect si populeaza cu date. */
  proiect
    .infoProiect(vm.proiectId)
    .then(function(response) {
      vm.proiect = response.data.proiect;

      vm.antetPagina = {
        titlu: vm.proiect.numeProiect
      };

      vm.membriProiect = vm.proiect.membri;
      vm.managerProiectId = vm.proiect.managerProiect;

      useri
        .listaUseri()
        .then(function(response) {
          var useri = response.data.listaUseri;

          vm.membriProiect.forEach(function(membru, index, membriProiect) {
            var userCautat = useri.filter(function(user) {
              return user.userId === membru.membru;
            });

            membriProiect[index].numeIntreg = userCautat[0].numeIntreg;
          });

          var dateManagerProiect = useri.filter(function(user) {
            return user.userId === vm.proiect.managerProiect;
          });

          vm.managerProiectNume = dateManagerProiect[0].numeIntreg;

        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });
};
