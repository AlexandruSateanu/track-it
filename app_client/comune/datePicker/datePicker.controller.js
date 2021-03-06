module.exports = function datePickerCtrl() {
  var vm = this;

  /** optiuni date picker */
  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2050, 5, 22),
    minDate: new Date(2010, 1, 1),
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
