module.exports = function creareProiectCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Creare Proiect'
  };

  vm.dateForm = {
    numeProiect: '',
    cheieProiect: '',
    tipProiect: ''
  };

  vm.onSubmit = function () {
    vm.formError = "";
    
    if (!vm.dateForm || !vm.dateForm.numeProiect || !vm.dateForm.cheieProiect || !vm.dateForm.tipProiect) {
      vm.formError = "Toate campurile sunt obligatorii!";
      return false;
    } else if (vm.dateForm.cheieProiect.length > 3) {
      vm.formError = "Cheia trebuie sa aiba maxim 3 caractere!"
    } else {
      console.log(vm.dateForm);
      return false;
    }
  };
};
