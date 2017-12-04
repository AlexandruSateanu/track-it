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

module.exports = function setariProiectCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Setari Proiect'
  };

  vm.proiect = proiect;

  vm.tipProiect = proiect.tipProiect;

  vm.setariEtape = true;

  /* Ascundere tab etape daca proiectul este de tip fara etape. */
  if (vm.tipProiect === 2) {
    vm.setariEtape = false;
  }
};
