module.exports = function alegePerioadaCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege perioada proiectului'
  };

  vm.dateForm = {
    dataStart: '',
    dataSfarsit: ''
  };

  vm.onSubmit = function () {
    vm.formError = '';
    /** validare form */
    if (!vm.dateForm || !vm.dateForm.dataStart || !vm.dateForm.dataSfarsit) {
      vm.formError = "Alege ambele date!";
      return false;
    } else if (vm.dateForm.dataStart.getTime() >= vm.dateForm.dataSfarsit.getTime()) {
      vm.formError = "Data de sfarsit trebuie sa fie mai mare ca data de start!";
      return false;
    }
    else {
      vm.formError = '';
      console.log(vm.dateForm);
      return false;
    }
  };
};
