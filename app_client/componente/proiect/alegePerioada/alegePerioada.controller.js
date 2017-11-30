module.exports = function alegePerioadaCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege perioada proiectului'
  };

  vm.dateForm = {
    dataStart: '',
    dataSfarsit: ''
  };

  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2030, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  vm.format = 'dd MMMM yyyy';

  vm.popupStart = {
    opened: false
  };

  vm.popupSfarsit = {
    opened: false
  };

  vm.deschideStart = function() {
    vm.popupStart.deschis = true;
  };

  vm.deschideSfarsit = function() {
    vm.popupSfarsit.deschis = true;
  };

  vm.onSubmit = function () {
    vm.formError = "";
    
    if (!vm.dateForm || !vm.dateForm.dataStart || !vm.dateForm.dataSfarsit) {
      vm.formError = "Alege ambele date!";
      return false;
    } else {
      console.log(vm.dateForm.dataStart);
      console.log(vm.dateForm.dataSfarsit);
      return false;
    }
  };
};
