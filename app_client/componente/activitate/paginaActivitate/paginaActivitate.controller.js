module.exports = function paginaActivitateCtrl($routeParams, proiect, activitate, $location, autentificare) {
  var vm = this;

  vm.proiectId = $routeParams.proiectId;
  vm.activitateId = $routeParams.activitateId;

  /* Cere detalii despre activitate si populeaza cu date. */
  proiect
    .infoProiect(vm.proiectId)
    .then(function(response) {
      vm.proiect = response.data.proiect;

      proiect
        .membriProiect(vm.proiectId)
        .then(function(response) {
          var membri = response.data.membriProiect;

          activitate
            .infoActivitate(vm.proiectId, vm.activitateId)
            .then(function(response) {
              vm.activitate = response.data.activitate;
    
              vm.activitateCod = vm.proiect.activitati.filter(function(activitate) {
                return activitate.activitateId === parseInt(vm.activitateId);
              })[0].cod;
    
              vm.antetActivitate = {
                titlu: vm.activitate.numeActivitate,
                cod: vm.activitateCod
              };
    
              vm.etapa = vm.proiect.etape.filter(function(etapa) {
                return etapa._id === vm.activitate.etapaId;
              })[0];
    
              vm.responsabil = membri.filter(function(membru) {
                return vm.activitate.responsabil === membru.userId;
              })[0];
    
              activitate
                .listaStatus()
                .then(function(response) {
                  vm.statusuri = response.data.listaStatus;
    
                  vm.activitateStatus = vm.statusuri.filter(function(status) {
                    return status.statusId === vm.activitate.status;
                  })[0];
                }, function(response) {
                  return null;
                });
            }, function(response) {
              return null;
            });
            
          activitate
            .listaComentarii(vm.proiectId, vm.activitateId)
            .then(function(response) {
              vm.comentarii = response.data.comentarii;

              vm.comentarii.forEach(function(comentariu) {
                var membruGasit = membri.filter(function(user) {
                  return user.userId === comentariu.userId;
                });

                if (membruGasit.length === 1) {
                  comentariu.numeUser = membruGasit[0].numeIntreg;
                }
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

  vm.statusForm = {
    statusNou: ''
  };

  vm.confirmareStatus = '';
  vm.confirmareComentariu = '';

  vm.onStatusSubmit = function () {
    vm.statusFormError = '';

    /** validare form status. */
    if (!vm.statusForm || !vm.statusForm.statusNou) {
      vm.statusFormError = "Selecteaza un status!";
      return false;
    }
    
    else {
      vm.statusFormError = '';
      vm.executaSchimbaStatus(vm.proiectId, vm.activitateId, vm.statusForm);
    }
  };

  vm.comentariuForm = {
    userComentariu: autentificare.userCurrent().userId,
    textComentariu: ''
  };

  vm.onComentariuSubmit = function() {
    vm.comentariuFormError = '';

      /** validare form comentariu. */
      if (!vm.comentariuForm || !vm.comentariuForm.textComentariu) {
        vm.comentariuFormError = "Comentariul lipseste!";
        return false;
      }
      
      else {
        vm.comentariuFormError = '';
        vm.executaAdaugareComentariu(vm.proiectId, vm.activitateId, vm.comentariuForm);
      }
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de editare activitate. */
  vm.executaSchimbaStatus = function(proiectId, activitateId, date) {
    activitate
      .schimbaStatus(proiectId, activitateId, date)
      .then(function(response) {
        vm.confirmareStatus = response.data.message;

        vm.activitateStatus = vm.statusuri.filter(function(status) {
          return status.statusId === response.data.activitate.status;
        })[0];
      }, function(response) {
        vm.statusFormError = response.data.message;
      });
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de stergere activitate. */
  vm.executaStergeActivitate = function(proiectId, activitateId) {
    activitate
      .stergeActivitate(proiectId, activitateId)
      .then(function(response) {
        $location.path('/proiect/' + proiectId);
      }, function(response) {
        return null;
      });
  };

  /* Functie care foloseste serviciul de proiect cu functia lui de adaugare comentariu. */
  vm.executaAdaugareComentariu = function(proiectId, activitateId, date) {
    activitate
      .adaugaComentariu(proiectId, activitateId, date)
      .then(function(response) {
        vm.confirmareComentariu = response.data.message;
        var comentariu = response.data.comentariu;
        
        proiect
          .membriProiect(vm.proiectId)
          .then(function(response) {
            var membri = response.data.membriProiect; 
            var autor = membri.filter(function(membru) {
              return comentariu.userId === membru.userId;
            })[0];

            comentariu.numeUser = autor.numeIntreg;
            
            vm.comentarii.push(comentariu);
          }, function(response) {
            return null;
          });
      }, function(response) {
        vm.comentariuFormError = response.data.message;
      });
  };
};
