module.exports = function registerCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Inregistrare'
  };

  vm.credentiale = {
    username: '',
    email: '',
    numeIntreg: '',
    parola: '',
    parolaConfirmare: ''
  };

  vm.onSubmit = function () {
    vm.formError = "";

    if (!vm.credentiale || !vm.credentiale.username || !vm.credentiale.numeIntreg || !vm.credentiale.email || !vm.credentiale.parola || !vm.credentiale.parolaConfirmare) {
      vm.formError = "Toate campurile sunt obligatorii!";
      return false;
    } else {
      console.log(vm.credentiale);
    }
  };
/*
  vm.returnPage = $location.search().page || '/';

  vm.doRegister = function() {
    vm.formError = "";

    authentication
      .register(vm.credentials)
      .error(function(err) {
        vm.formError = err;
      })
      .then(function() {
        $location.search('page', null);
        $location.path(vm.returnPage);
      });
  };*/
};
