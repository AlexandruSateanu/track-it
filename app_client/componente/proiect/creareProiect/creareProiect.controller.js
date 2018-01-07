module.exports = function creareProiectCtrl(proiect, $location, $scope, creareProiectActiva) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Creare Proiect'
  };

  vm.dateForm = {
    numeProiect: '',
    cheieProiect: '',
    tipProiect: '',
    dataStart: '',
    dataSfarsit: ''
  };

  vm.onSubmit = function () {
    vm.formError = '';
    
    /* Validare form */
    if (!vm.dateForm || !vm.dateForm.numeProiect || !vm.dateForm.cheieProiect || !vm.dateForm.tipProiect || !vm.dateForm.dataStart || !vm.dateForm.dataSfarsit) {
      vm.formError = "Toate campurile sunt obligatorii!";
      return false;
    } 
    
    else if (vm.dateForm.cheieProiect.length > 3) {
      vm.formError = "Cheia trebuie sa aiba maxim 3 caractere!"
    }

    /* Verificare validitate perioada. */
    else if (vm.dateForm.dataStart.getTime() >= vm.dateForm.dataSfarsit.getTime()) {
      vm.formError = "Data de sfarsit trebuie sa fie mai mare ca data de start!";
      return false;
    }
    
    else {
      vm.formError = '';
      vm.executaCreare(vm.dateForm);
    }
  };
  
  /* Functie care foloseste serviciul de proiect cu functia lui de creare proiect. */
  vm.executaCreare = function(date) {
    proiect
      .creare(date)
      .then(function(response) {
        var tipProiect = response.data.proiect.tipProiect;
        var proiectId = response.data.proiect._id;

        /* Salveaza in $scope referinta catre proiectul creat pentru a limita 
        accessul la rutele de creare doar in timpul procesului de creare. */
        $scope.creareProiectActiva = creareProiectActiva;
        $scope.creareProiectActiva.proiectId = proiectId;

        if (tipProiect === '1') {
          $location.path('/proiect/' + proiectId + '/alege-etape');      
        }

        else if (tipProiect === '2') {
          $location.path('/proiect/' + proiectId + '/alege-membri');
        }

      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
