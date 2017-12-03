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

module.exports = function alegeMembriCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege Membri'
  };

  vm.membri = membri;
  vm.roluri = roluri;

  vm.faraMembri = true;
  vm.continua = false;

  vm.toggleMembri = function () {
    vm.faraMembri = false;
  };

  vm.dateForm = {
    membru: '',
    rol: ''
  };

  vm.onSubmit = function () {
    vm.formError = "";

    if (!vm.dateForm || !vm.dateForm.membru || !vm.dateForm.rol) {
      vm.formError = 'Toate campurile sunt obligatorii!';
      return false;
    } else if (vm.alegeMembri.$invalid) {
      vm.formError = 'Unele campuri contin informatii invalide!'; 
    } else {
      console.log(vm.dateForm);
      vm.dateForm = {};
      vm.alegeMembri.$setPristine();
      vm.alegeMembri.$setUntouched();
      vm.continua = true;
      return false;
    }
  };
};
