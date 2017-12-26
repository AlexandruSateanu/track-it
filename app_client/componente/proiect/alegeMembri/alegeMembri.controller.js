module.exports = function alegeMembriCtrl(proiect, $routeParams, useri) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Alege Membri'
  };

  /* Cere o lista cu toti membrii disponibili sa fie adaugati la proiect. */
  useri
    .listaUseri()
    .then(function(response) {
      vm.membri = response.data.listaUseri;
    }, function(response) {
      return null;
    });
  
  /* Cere o lista cu toate rolurile posibile sa fie adaugati la proiect. */
  useri
    .listaRoluri()
    .then(function(response) {
      vm.roluri = response.data.listaRoluri;
    }, function(response) {
      return null;
    });

  /* Variabile flag pentru a arata form-ul de adaugare membrii sau a trece 
  mai departe fara a adauga. Folosite cu ng-show in template. */
  vm.faraMembri = true;
  vm.continua = false;

  /* Salveaza id-ul proiectului pentru a-l adauga la URL-ul care duce la noul
  proiect creat. */
  vm.proiectStartId = $routeParams.proiectId;

  /** amanare introducere membrii */
  vm.toggleMembri = function () {
    vm.faraMembri = false;
  };

  vm.dateForm = {
    membru: '',
    rol: ''
  };

  vm.onSubmit = function() {
    vm.formError = '';

    /* validare form */
    if (!vm.dateForm || !vm.dateForm.membru || !vm.dateForm.rol) {
      vm.formError = 'Toate campurile sunt obligatorii!';
      return false;
    } 
    
    else if (vm.alegeMembri.$invalid) {
      vm.formError = 'Unele campuri contin informatii invalide!'; 
    } 
    
    else {
      vm.formError = '';
      console.log(vm.dateForm);
      vm.dateForm = {};
      
      /** resetare campuri */
      vm.alegeMembri.$setPristine();
      vm.alegeMembri.$setUntouched();
      vm.continua = true;
      return false;
    }
  };
};
