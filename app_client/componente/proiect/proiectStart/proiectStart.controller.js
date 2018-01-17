module.exports = function proiectStartCtrl($scope, creareProiectActiva, $routeParams, proiect, activitate) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;

  /* Deoarece proiectul a fost deja creat, putem bloca accesul la toate rutele de creare. */
  $scope.creareProiectActiva = creareProiectActiva;
  $scope.creareProiectActiva = {};

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

          activitate
            .listaActivitati(vm.proiectId)
            .then(function(response) {
              vm.activitatiRecente = response.data.listaActivitati;

              vm.activitatiRecente.sort(function(a, b) {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
              });

              vm.activitatiRecente.splice(5);
            }, function(response) {
              return null;
            });
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });
};
