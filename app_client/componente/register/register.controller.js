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
    } else if (!vm.credentiale.parola !== !vm.credentiale.parolaConfirmare) {
      vm.formError = 'Parolele nu sunt identice!';
    } else {
      vm.executaRegister();
    }
  };

  vm.paginaReturnare = $location.search().page || '/';

  vm.executaRegister = function() {
    vm.formError = '';

    autentificare
      .register(vm.credentials)
      .error(function(err) {
        vm.formError = err;
      })
      .then(function() {
        $location.search('page', null);
        $location.path(vm.paginaReturnare);
      });
  };
};
