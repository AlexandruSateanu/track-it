module.exports = function editeazaPerioadaCtrl() {
  var vm = this;

  /* Mostenire controller parinte */
  setariProiectCtrl.apply(vm, arguments);

  /* Accesare date din scope-ul parinte */
  vm.proiect = vm.proiect;

  vm.dataStartCurenta = vm.proiect.perioada.dataStart;
  vm.dataSfarsitCurenta = vm.proiect.perioada.dataSfarsit;

  vm.dateForm = {
    dataStart: '',
    dataSfarsit: ''
  };

  vm.perioadaOnSubmit = function () {
    vm.formError = '';
    
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
