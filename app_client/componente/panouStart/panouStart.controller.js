var proiecteleMele = [
  {
    id: 1,
    numeProiect: "Proiectul 1"
  },
  {
    id: 2,
    numeProiect: "Proiectul 2"
  }
];

var activitatiRecente = [
  {
    cod: "PR1-ACT2",
    numeActivitate: "Activitate 2",
    idProiect: 1
  },
  {
    cod: "PR1-ACT1",
    numeActivitate: "Activitate 1",
    idProiect: 1
  },
  {
    cod: "PR2-ACT4",
    numeActivitate: "Activitate 4",
    idProiect: 2
  },
  {
    cod: "PR2-ACT3",
    numeActivitate: "Activitate 3",
    idProiect: 2
  }
];

var activitateaMea = [
  {
    cod: "PR2-ACT2",
    numeActivitate: "Activitatea Mea 2",
    idProiect: 2
  },
  {
    cod: "PR2-ACT1",
    numeActivitate: "Activitatea Mea 1",
    idProiect: 2
  }
];

module.exports = function panouStartCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Panou start'
  };

  vm.activitatiRecente = activitatiRecente;

  vm.activitateaMea = activitateaMea;

  vm.proiecteleMele = proiecteleMele;
}
