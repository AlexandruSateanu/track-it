var membri = [
  {
    id: 1,
    nume: 'Cristina Ungureanu'
  },
  {
    id: 2,
    nume: 'Alex Sateanu'
  },
  {
    id: 3,
    nume: 'Andreea Ujica'
  },
  {
    id: 4,
    nume: 'Bogdan Chircu'
  },
  {
    id: 5,
    nume: 'Test Test'
  }
];

var roluri = [
  {
    rolId: 1,
    rol: "Coordonator echipa"
  },
  {
    rolId: 2,
    rol: "Membru echipa"
  },
  {
    rolId: 3,
    rol: "Consultant"
  },
  {
    rolId: 4,
    rol: "Vizitator"
  },
];

module.exports = function editeazaMembriCtrl($scope) {
  var vm = this;

  /* Accesare date din scope-ul parinte */
  vm.dateForm = $scope.vm.proiect.membri;

  vm.membri = membri;
  vm.roluri = roluri;
  
  vm.formError = [];
  
  vm.membruOnSubmit = function(index) {
    var date = vm.dateForm[index];
  
    /* validare form */
    if (!date || !date.rol) {
      vm.formError[index] = "Toate campurile trebuie completate!";
      return false;
    } else {
      vm.formError[index] = '';
      console.log(date);
      return false;
    }
  };
};
