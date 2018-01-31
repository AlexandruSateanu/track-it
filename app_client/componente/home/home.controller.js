module.exports = function homeCtrl($location, autentificare) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Bine aţi venit la Trackit.',
    subtitlu: 'Ajutorul vostru în managementul proiectelor.'
  }

  vm.credentiale = {
    email: '',
    parola: ''
  }

  vm.onSubmit = function () {
    vm.formError = "";
    
    if (!vm.credentiale || !vm.credentiale.email || !vm.credentiale.parola) {
      vm.formError = "Toate campurile sunt obligatorii!";
      return false;
    } 
    
    else {
      vm.executaConectare();
    }
  };

  vm.executaConectare = function() {
    vm.formError = "";

    autentificare
      .conectare(vm.credentiale)
      .then(function(response) {
        $location.path('/panou-start');
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
}
