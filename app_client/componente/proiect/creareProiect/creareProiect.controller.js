module.exports = function creareProiectCtrl(proiect, $location) {
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
    vm.formError = '';
    
    /* Validare form */
    if (!vm.dateForm || !vm.dateForm.numeProiect || !vm.dateForm.cheieProiect || !vm.dateForm.tipProiect) {
      vm.formError = "Toate campurile sunt obligatorii!";
      return false;
    } 
    
    else if (vm.dateForm.cheieProiect.length > 3) {
      vm.formError = "Cheia trebuie sa aiba maxim 3 caractere!"
    } 
    
    else {
      vm.formError = '';
      vm.executaCreare();
    }
  };

  vm.confirmare = '';
  
  vm.executaCreare = function() {
    proiect
      .creare(vm.dateForm)
      .then(function(response) {
        vm.confirmare = response.data.message;
        $location.path('/proiect/' + response.data.proiect._id + '/alege-perioada');

      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
