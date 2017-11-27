var FORMAT_DATA = require('../../../constante/formatDateCalendar.js');

module.exports = function setariInitialeCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Setari Initiale'
  };

  vm.today = function() {
    vm.dt = new Date();
  };

  vm.today();

  vm.clear = function() {
    vm.dt = null;
  };

  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  vm.open1 = function() {
    vm.popup1.opened = true;
  };

  vm.open2 = function() {
    vm.popup2.opened = true;
  };

  vm.format = FORMAT_DATA;

  vm.popup1 = {
    opened: false
  };

  vm.popup2 = {
    opened: false
  };
};
