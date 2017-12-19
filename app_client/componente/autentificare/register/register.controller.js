module.exports = function registerCtrl($location, autentificare) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Inregistrare'
  };

  vm.credentiale = {
    email: '',
    numeIntreg: '',
    parola: '',
    parolaConfirmare: ''
  };

  vm.onSubmit = function () {
    vm.formError = '';

    if (!vm.credentiale || !vm.credentiale.numeIntreg || !vm.credentiale.email || !vm.credentiale.parola || !vm.credentiale.parolaConfirmare) {
      vm.formError = 'Toate campurile sunt obligatorii!';
      return false;
    } 
    
    else if (vm.credentiale.parola !== vm.credentiale.parolaConfirmare) {
      vm.formError = 'Parolele nu sunt identice!';
    } 
    
    else {
      vm.executaRegister();
    }
  };

  vm.confirmare = '';

  vm.executaRegister = function() {
    vm.formError = '';

    autentificare
      .register(vm.credentiale)
      .then(function(response) {
        vm.confirmare = response.data.message;
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
