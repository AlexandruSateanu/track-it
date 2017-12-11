module.exports = function homeCtrl($location, autentificare) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Bine ati venit la Trackit.',
    subtitlu: 'Pur si simplu taskuri.'
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
    } else {
      vm.executaConectare();
    }
  };

  vm.executaConectare = function() {
    vm.formError = "";

    autentificare
      .conectare(vm.credentiale)
      .error(function(err) {
        vm.formError = err;
      })
      .then(function() {
        $location.path('/panou-start');
      });
  };
}
