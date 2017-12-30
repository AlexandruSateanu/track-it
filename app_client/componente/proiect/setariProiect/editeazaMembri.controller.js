module.exports = function editeazaMembriCtrl(proiect, $routeParams, useri, autentificare) {
  var vm = this;

  var proiectId = $routeParams.proiectId;
  
  /* Cere detalii despre proiect si extrage membri curenti. */
  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      vm.dateForm = response.data.membri;
    }, function(response) {
      return null;
    });

  /* Cere o lista cu toti membrii disponibili sa fie adaugati la proiect. */
  useri
    .listaUseri()
    .then(function(response) {
      vm.membri = response.data.listaUseri;
      
      /* Sterge user-ul logat din lista deoarece el nu se poate adauga pe sine la proiect. */
      vm.membri = vm.membri.filter(function(membru) {
        return membru.userId !== autentificare.userCurrent().userId;
      });
    }, function(response) {
      return null;
    });
  
  /* Cere o lista cu toate rolurile posibile. */
  useri
    .listaRoluri()
    .then(function(response) {
      vm.roluri = response.data.listaRoluri;
    }, function(response) {
      return null;
    });
  
  vm.formError = [];
  
  vm.membruOnSubmit = function(index) {
    var date = vm.dateForm[index];
  
    /* validare form */
    if (!date || !date.rol) {
      vm.formError[index] = "Toate campurile trebuie completate!";
      return false;
    } 
    
    else {
      vm.formError[index] = '';
      console.log(date);
      return false;
    }
  };
};
