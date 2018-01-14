module.exports = function alegeMembriCtrl(proiect, $routeParams, useri, autentificare, $location, $rootScope, $scope, creareProiectActiva) {
  var vm = this;
  
  vm.antetPagina = {
    titlu: 'Alege Membri'
  };

  /* Salveaza id-ul proiectului pentru a-l adauga la URL-ul care duce la noul
  proiect creat. */
  vm.proiectId = $routeParams.proiectId;

  $scope.creareProiectActiva = creareProiectActiva;

  /* Nu permite accesarea paginii de alegere etape cand nu este activ procesul de creare. */
  $rootScope.$watch(function() {
    return $location.path();
  }, function() {
    if ($scope.creareProiectActiva.proiectId != vm.proiectId && $location.path().indexOf('alege-membri') !== -1) {
      $location.path('/404');
    }
  });

  /* Cere o lista cu toti membrii disponibili sa fie adaugati la proiect. */
  useri
    .listaUseri()
    .then(function(response) {
      vm.membri = response.data.listaUseri;
      
      /* Sterge user-ul logat din lista deoarece el nu se poate adauga pe sine la proiect. */
      vm.membri = vm.membri.filter(function(membru) {
        return membru.userId !== autentificare.userCurrent().userId;
      });

      /* Sterge userii deja adaugati. */
      proiect
        .membriProiect(vm.proiectId)
        .then(function(response) {
          var membriExistenti = response.data.membriProiect;

          membriExistenti.forEach(function(membruExistent) {
            vm.membri = vm.membri.filter(function(membru) {
              return membru.userId !== membruExistent.userId;
            });
          });
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });
  
  /* Cere o lista cu toate rolurile posibile. */
  useri
    .listaRoluri()
    .then(function(response) {
      vm.roluri = response.data.listaRoluri;
    }, function(response) {
      return null;
    });

  /* Variabile flag pentru a arata form-ul de adaugare membrii sau a trece 
  mai departe fara a adauga. Folosite cu ng-show in template. */
  vm.faraMembri = true;
  vm.continua = false;

  /* amanare introducere membrii */
  vm.toggleMembri = function () {
    vm.faraMembri = false;
  };

  vm.confirmare = '';
  
  vm.dateForm = {
    membru: '',
    rol: ''
  };

  vm.onSubmit = function() {
    vm.formError = '';

    /* validare form */
    if (!vm.dateForm || !vm.dateForm.membru || !vm.dateForm.rol) {
      vm.formError = 'Toate campurile sunt obligatorii!';
      return false;
    } 
    
    else if (vm.alegeMembri.$invalid) {
      vm.formError = 'Unele campuri contin informatii invalide!'; 
    } 
    
    else {
      vm.formError = '';
      vm.executaAlegereMembru(vm.proiectId, vm.dateForm);

      /* Sterge noul membru din lista pentru a nu mai putea fi adaugat la proiect. */
      vm.membri = vm.membri.filter(function(membru) {
        return membru.userId !== vm.dateForm.membru.userId;
      });
      
      /* Resetare campuri */
      vm.dateForm = {};
      vm.alegeMembri.$setPristine();
      vm.alegeMembri.$setUntouched();
      vm.continua = true;
    }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de alegere membri. */
  vm.executaAlegereMembru = function(proiectId, date) {
    proiect
      .alegeMembru(proiectId, date)
      .then(function(response) {
        vm.confirmare = response.data.message;
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
