module.exports = function editeazaMembriCtrl(proiect, $routeParams, useri) {
  var vm = this;

  vm.dateForm = [];

  var proiectId = $routeParams.proiectId;
  
  /* Cere detalii despre proiect si extrage membri curenti. */
  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      vm.membriProiect = response.data.proiect.membri;

      /* Cere o lista cu toti membrii pentru a extrage numele. */
      useri
        .listaUseri()
        .then(function(response) {
          vm.useri = response.data.listaUseri;

          vm.membriProiect.forEach(function(membru) {
            var userCautat = vm.useri.filter(function(user) {
              return user.userId === membru.membru;
            });

            membru.numeIntreg = userCautat[0].numeIntreg;
            
            vm.dateForm.push({
              numeIntreg: membru.numeIntreg,
              membruId: membru._id,
              rol: membru.rol
            });
          });

          /* Cere o lista cu toate rolurile posibile. */
          useri
            .listaRoluri()
            .then(function(response) {
              vm.roluri = response.data.listaRoluri;

              vm.dateForm.forEach(function(data, index, dateForm) {
                var rol = vm.roluri.filter(function(rol) {
                  return rol.rolId === data.rol; 
                });

                var numeRol = rol[0].rol;

                dateForm[index].numeRol = numeRol;
              });
            }, function(response) {
              return null;
            });
        }, function(response) {
          return null;
        });
    }, function(response) {
      return null;
    });
  
  vm.formError = [];

  vm.confirmare = [];
  
  vm.membruOnSubmit = function(index) {
    var date = vm.dateForm[index];
  
    /* validare form */
    if (!date || !date.rol) {
      vm.formError[index] = "Toate campurile trebuie completate!";
      return false;
    } 
    
    else {
      vm.formError[index] = '';
      vm.executaEditareMembru(proiectId, angular.toJson(vm.dateForm[index]), index);
    }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de editare membru. */
  vm.executaEditareMembru = function(proiectId, date, index) {
    proiect
      .editareMembru(proiectId, date)
      .then(function(response) {
        vm.confirmare[index] = response.data.message;
      }, function(response) {
        vm.formError[index] = response.data.message;
      });
  };
};
