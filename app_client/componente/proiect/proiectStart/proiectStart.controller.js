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

      vm.managerProiectId = vm.proiect.managerProiect;

      /* Membri proiect. */
      proiect
        .membriProiect(vm.proiectId)
        .then(function(response) {
          vm.membriProiect = response.data.membriProiect;

          /* Nume manager Proiect. */
          vm.managerProiect = vm.membriProiect.filter(function(membru) {
            return vm.managerProiectId === membru.userId;
          })[0];

          /* Scoate managerul de proiect din liste de membri. Il afisam separat. */
          vm.membriProiect = vm.membriProiect.filter(function(membru) {
            return vm.managerProiectId !== membru.userId;
          });
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });
};
