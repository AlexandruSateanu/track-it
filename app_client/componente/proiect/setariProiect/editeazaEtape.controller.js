module.exports = function editeazaEtapeCtrl(proiect, $routeParams) {
  var vm = this;

  vm.dateForm = [];
  
  /* Initializeaza valori predefinite pentru perioadele etapelor. */
  var dataMinima = new Date();
  var dataMaxima = new Date(2050, 5, 22);
  
  /* Cere detalii despre proiect si extrage etapele. */
  var proiectId = $routeParams.proiectId;

  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      var etape = response.data.proiect.etape;
      dataMinima = response.data.proiect.dataStart;
      dataMaxima = response.data.proiect.dataSfarsit;

      etape.forEach(function(etapa) {
        vm.dateForm.push({
          numeEtapa: etapa.numeEtapa,
          dataStart: new Date(etapa.dataStart),
          dataSfarsit: new Date(etapa.dataSfarsit)
        });
      });

      /* Optiuni pentru directiva Angular de alegere date. */
      vm.dateOptiuni = {
        formatYear: 'yy',
        minDate: new Date(dataMinima),
        maxDate: new Date(dataMaxima),
        startingDay: 1
      };
    }, function(response) {
      return null;
    });
  
  vm.formError = [];
  
  vm.etapaOnSubmit = function(index) {
    var date = vm.dateForm[index];
  
    /** validare form: daca exista campuri goale sau perioada gresita */
    if (!date || !date.numeEtapa || !date.dataStart || !date.dataSfarsit) {
      vm.formError[index] = "Toate campurile trebuie completate!";
      return false;
    } 
    
    else if (date.dataStart.getTime() >= date.dataSfarsit.getTime()) {
      vm.formError[index] = "Datele de sfarsit trebuie sa fie mai mari ca datele de start!";
      return false;
    } 
    
    else {
      vm.formError[index] = '';
      console.log(date);
      return false;
    }
  };
};
