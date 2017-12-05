var proiect = {
  id: 1,
  numeProiect: "Proiect 1",
  projectManager: "Alex Sateanu"
};

var activitatiRecente = {
  activitate1: {
    cod: "PR1-ACT2",
    nume: "Activitate 2",
    idProiect: 1,
    data: "23 03 2016, 11:00"
  },
  activitate2: {
    cod: "PR1-ACT1",
    nume: "Activitate 1",
    idProiect: 1,
    data: "23 03 2016, 10:00"
  }
};

var statistici = {
  status: [
    {
      nume: "deschise",
      valoare: 5
    },
    {
      nume: "in curs",
      valoare: 3
    },
    {
      nume: "in analiza",
      valoare: 2
    },
    {
      nume: "terminate",
      valoare: 10
    }
  ],
  prioritate: [
    {
      nume: "scazuta",
      valoare: 4
    },
    {
      nume: "medie",
      valoare: 10
    },
    {
      nume: "majora",
      valoare: 9
    },
    {
      nume: "urgenta",
      valoare: 2
    }
  ]
};

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

module.exports = function proiectStartCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: proiect.numeProiect
  };

  vm.activitatiRecente = activitatiRecente;

  vm.statisticiStatus = statistici.status;

  vm.statisticiPrioritate = statistici.prioritate;

  vm.projectManager = proiect.projectManager;

  vm.membri = membri;
}
