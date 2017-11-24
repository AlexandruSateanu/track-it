var proiecteleMele = {
  proiect1: {
    nume: "Proiectul 1"
  },
  proiect2: {
    nume: "Proiectul 2"
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
  },
  activitate3: {
    cod: "PR2-ACT4",
    nume: "Activitate 4",
    proiect: "Proiect 2",
    data: "22 03 2016, 16:00"
  },
  activitate4: {
    cod: "PR2-ACT3",
    nume: "Activitate 3",
    proiect: "Proiect 2",
    data: "22 03 2016, 13:00"
  }
};

var activitateaMea = {
  activitate1: {
    cod: "PR2-ACT2",
    nume: "Activitatea Mea 2",
    proiect: "Proiect 2",
    data: "21 03 2016, 12:00"
  },
  activitate2: {
    cod: "PR2-ACT1",
    nume: "Activitatea Mea 1",
    proiect: "Proiect 2",
    data: "21 03 2016, 10:00"
  }
};

module.exports = function panouStartCtrl () {
  var vm = this;
  vm.mesaj = 'Panoul tau de start';

  vm.activitatiRecente = activitatiRecente;

  vm.activitateaMea = activitateaMea;

  vm.proiecteleMele = proiecteleMele;
}
