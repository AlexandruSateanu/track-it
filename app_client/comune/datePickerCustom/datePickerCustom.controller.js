module.exports = function datePickerCustomCtrl() {
  var vm = this;

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
