module.exports = function datePickerCtrl() {
  var vm = this;

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
};
