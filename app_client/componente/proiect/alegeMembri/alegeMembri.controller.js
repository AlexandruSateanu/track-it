module.exports = function alegeMembriCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege Membri'
  };

  /*vm.dateForm = {
    numeProiect: '',
    cheieProiect: '',
    tipProiect: ''
  };*/

  vm.faraMembri = true;

  vm.toggleMembri = function () {
    vm.faraMembri = false;
  };

  vm.membri = [{}];
  
  vm.adaugaOptiune = function() {
    vm.membri.push({});
  };
    
  vm.stergeOptiune = function() {
    var ultimul = vm.membri.length - 1;
    if (ultimul > 0) {
      vm.formError = "";
      vm.membri.splice(ultimul);
    } else {
      vm.formError = "Alege cel putin un membru!";
    }
  };
/*
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
  };*/
};
