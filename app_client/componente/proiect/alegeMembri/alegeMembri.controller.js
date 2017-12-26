module.exports = function alegeMembriCtrl(proiect, $routeParams, useri, autentificare) {
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
  vm.proiectId = $routeParams.proiectId;

  /** amanare introducere membrii */
  vm.toggleMembri = function () {
    vm.faraMembri = false;
  };

  vm.confirmare = '';

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
      vm.executaAlegereMembru(vm.proiectId, vm.dateForm);
      vm.dateForm = {};
      
      /** resetare campuri */
      vm.alegeMembri.$setPristine();
      vm.alegeMembri.$setUntouched();
      vm.continua = true;
    }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de alegere membri. */
  vm.executaAlegereMembru = function(proiectId, date) {
    proiect
      .alegeMembru(proiectId, date)
      .then(function(response) {
        vm.confirmare = response.data.message;     
      }, function(response) {
        vm.formError = response.data.message;
      });
  };
};
