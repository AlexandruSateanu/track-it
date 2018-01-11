module.exports = function creareActivitateCtrl($routeParams, proiect, activitate, useri, $location) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Creaza activitate noua'
  };

  var proiectId = $routeParams.proiectId;

  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      vm.proiect = response.data.proiect;

      useri
        .listaUseri()
        .then(function(response) {
          var useri = response.data.listaUseri;

          vm.proiect.membri.forEach(function(membru, index, membriProiect) {
            var userCautat = useri.filter(function(user) {
              return user.userId === membru.membru;
            });

            membriProiect[index].numeIntreg = userCautat[0].numeIntreg;
          });

          var managerProiect = useri.filter(function(user) {
            return user.userId === vm.proiect.managerProiect;
          })[0];

          managerProiect.membru = vm.proiect.managerProiect;
          vm.proiect.membri.push(managerProiect);
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });

  vm.dateForm = {
    numeActivitate: '',
    responsabil: '',
    etapa: '',
    estimare: '',
    descriere: ''
  };

  vm.onSubmit = function () {
    vm.formError = '';
    /** validare form */
    if (!vm.dateForm || !vm.dateForm.numeActivitate || !vm.dateForm.responsabil || !vm.dateForm.etapa || !vm.dateForm.estimare) {
      vm.formError = 'Unele campuri obligatorii nu sunt completate!';
      return false;
    }

    else if (isNaN(vm.dateForm.estimare)) {
      vm.formError = 'Estimarea trebuie sa fie un numar intreg!';
    }
    
    else {
      vm.dateForm.responsabil = vm.dateForm.responsabil.membru;
      vm.formError = '';
      vm.executaCreare(proiectId, vm.dateForm);
    }
  };

  /* Functie care foloseste serviciul de activitate cu functia lui de creare. */
  vm.executaCreare = function(proiectId, date) {
    activitate
      .creare(proiectId, date)
      .then(function(response) {
        $location.path('/proiect/' + proiectId);
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
