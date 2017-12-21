var proiect = {
  id: 1,
  numeProiect: "Proiect 1",
  cheieProiect: 'PRJ',
  tipProiect: 1,
  projectManager: 1234,
  perioada: {
    dataStart: new Date('2017-12-14T00:00:00Z'),
    dataSfarsit: new Date('2018-03-28T00:00:00Z')
  },
  etape: [
    {
      id: 100,
      numeEtapa: 'Etapa unu',
      perioada: {
        dataStart: new Date('2017-12-14T00:00:00Z'),
        dataSfarsit: new Date('2018-01-05T00:00:00Z')
      }
    },
    {
      id: 200,
      numeEtapa: 'Etapa doi',
      perioada: {
        dataStart: new Date('2018-01-05T00:00:00Z'),
        dataSfarsit: new Date('2018-02-05T00:00:00Z')
      }
    },
    {
      id: 300,
      numeEtapa: 'Etapa trei',
      perioada: {
        dataStart: new Date('2018-02-05T00:00:00Z'),
        dataSfarsit: new Date('2018-03-28T00:00:00Z')
      }
    },
  ],
  membri: [
    {
      id: 1,
      nume: 'Cristina Ungureanu',
      rolId: 1
    },
    {
      id: 2,
      nume: 'Alex Sateanu',
      rolId: 2
    },
    {
      id: 3,
      nume: 'Andreea Ujica',
      rolId: 2
    },
    {
      id: 4,
      nume: 'Bogdan Chircu',
      rolId: 2
    },
    {
      id: 5,
      nume: 'Test Test',
      rolId: 4
    }
  ]
};

var prioritate = [
  {
    id: 11,
    nume: 'Minora'
  },
  {
    id: 22,
    nume: 'Medie'
  },
  {
    id: 33,
    nume: 'Mare'
  },
  {
    id: 44,
    nume: 'Majora'
  },
];

module.exports = function creareActivitateCtrl($location) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Creaza activitate noua'
  };

  vm.proiect = proiect;
  vm.prioritate = prioritate;

  vm.dateForm = {
    numeActivitate: '',
    responsabil: '',
    etapa: '',
    prioritate: '',
    perioadaEstimata: {},
    descriere: ''
  };

  vm.onSubmit = function () {
    vm.formError = '';
    /** validare form */
    if (!vm.dateForm || !vm.dateForm.numeActivitate || !vm.dateForm.responsabil || !vm.dateForm.etapa || !vm.dateForm.prioritate || !vm.dateForm.perioadaEstimata) {
      vm.formError = 'Unele campuri obligatorii nu sunt completate!';
      return false;
    } 
    
    else if (vm.dateForm.perioadaEstimata.dataStart.getTime() >= vm.dateForm.perioadaEstimata.dataSfarsit.getTime()) {
      vm.formError = "Data de sfarsit trebuie sa fie mai mare ca data de start!";
      return false;
    } 
    
    else {
      vm.formError = '';
      console.log(vm.dateForm);
      return false;
    }
  };
};
