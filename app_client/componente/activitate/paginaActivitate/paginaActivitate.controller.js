var activitate = {
  id: 1234,
  cod: "PR1-123",
  numeActivitate: "Activitate 2",
  idProiect: 1,
  responsabil: 'Cristina Ungureanu',
  etapa: 'Etapa unu',
  prioritate: 'Majora',
  perioadaEstimata: {
    dataStart: new Date('2017-12-14T00:00:00Z'),
    dataSfarsit: new Date('2017-12-25T00:00:00Z')
  },
  descriere: 'Balskkj asdldf asdwqdkna asdasdjk asd asd asdlefwefl wqfnjewefeow.'
};

var proiect = {
  id: 1,
  numeProiect: "Proiect 1",
  projectManager: "Alex Sateanu"
};

module.exports = function paginaActivitateCtrl() {
  var vm = this;

  vm.activitate = activitate;
  vm.proiect = proiect;

  vm.antetActivitate = {
    titlu: vm.activitate.numeActivitate,
    cod: vm.activitate.cod
  };

  vm.perioadaRealizata = {
    dataStart: '',
    dataSfarsit: ''
  };

  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2030, 5, 22),
    minDate: vm.activitate.perioadaEstimata.dataStart,
    startingDay: 1
  };

  vm.onSubmit = function () {
    vm.formError = '';

    /** validare form */
    if (!vm.perioadaRealizata || !vm.perioadaRealizata.dataStart || !vm.perioadaRealizata.dataSfarsit) {
      vm.formError = "Alege ambele date!";
      return false;
    } 
    
    else if (vm.perioadaRealizata.dataStart.getTime() >= vm.perioadaRealizata.dataSfarsit.getTime()) {
      vm.formError = "Data de sfarsit trebuie sa fie mai mare ca data de start!";
      return false;
    }
    
    else {
      vm.formError = '';
      console.log(vm.perioadaRealizata);
      return false;
    }
  };
};
