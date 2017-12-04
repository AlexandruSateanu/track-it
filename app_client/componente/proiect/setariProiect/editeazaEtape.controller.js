module.exports = function editeazaEtapeCtrl($scope) {
  var vm = this;

  /* Accesare date din scope-ul parinte */
  vm.dateForm = $scope.vm.proiect.etape;
  
  vm.formError = [];
  
  vm.etapaOnSubmit = function(index) {
    var date = vm.dateForm[index];
  
    /** validare form: daca exista campuri goale sau perioada gresita */
    if (!date || !date.numeEtapa || !date.perioada.dataStart || !date.perioada.dataSfarsit) {
      vm.formError[index] = "Toate campurile trebuie completate!";
      return false;
    } else if (date.perioada.dataStart.getTime() >= date.perioada.dataSfarsit.getTime()) {
      vm.formError[index] = "Datele de sfarsit trebuie sa fie mai mari ca datele de start!";
      return false;
    } else {
      vm.formError[index] = '';
      console.log(date);
      return false;
    }
  };
};
