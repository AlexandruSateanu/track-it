var proiect = {
  proiect1: {
    nume: "Proiectul 1",
    projectManager: "Alex Sateanu"
  }
};

var activitatiRecente = {
  activitate1: {
    cod: "PR1-ACT2",
    nume: "Activitate 2",
    proiect: "Proiect 1",
    data: "23 03 2016, 11:00"
  },
  activitate2: {
    cod: "PR1-ACT1",
    nume: "Activitate 1",
    proiect: "Proiect 1",
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

module.exports = function proiectStartCtrl () {
  var vm = this;
  vm.mesaj = proiect.proiect1.nume;

  vm.activitatiRecente = activitatiRecente;

  vm.statisticiStatus = statistici.status;

  vm.statisticiPrioritate = statistici.prioritate;

  vm.projectManager = proiect.proiect1.projectManager;
}
