var proiecteleMele = {
  proiect1: {
    id: 1,
    numeProiect: "Proiectul 1"
  },
  proiect2: {
    id: 2,
    numeProiect: "Proiectul 2"
  }
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
  },
  activitate3: {
    cod: "PR2-ACT4",
    nume: "Activitate 4",
    idProiect: 2,
    data: "22 03 2016, 16:00"
  },
  activitate4: {
    cod: "PR2-ACT3",
    nume: "Activitate 3",
    idProiect: 2,
    data: "22 03 2016, 13:00"
  }
};

var sarciniRecente = {
  sarcina1: {
    cod: "PR1-SAR2",
    nume: "Sarcina 2",
    idProiect: 1,
    data: "23 03 2016, 11:00"
  },
  sarcina2: {
    cod: "PR1-SAR1",
    nume: "Sarcina 1",
    idProiect: 1,
    data: "23 03 2016, 10:00"
  },
  sarcina3: {
    cod: "PR2-SAR4",
    nume: "Sarcina 4",
    idProiect: 2,
    data: "22 03 2016, 16:00"
  },
  sarcina4: {
    cod: "PR2-SAR3",
    nume: "Sarcina 3",
    idProiect: 2,
    data: "22 03 2016, 13:00"
  }
};

var activitateaMea = {
  activitate1: {
    cod: "PR2-ACT2",
    nume: "Activitatea Mea 2",
    idProiect: 2,
    data: "21 03 2016, 12:00"
  },
  activitate2: {
    cod: "PR2-ACT1",
    nume: "Activitatea Mea 1",
    idProiect: 2,
    data: "21 03 2016, 10:00"
  }
};

module.exports = function panouStartCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Panoul tau de start'
  };

  vm.activitatiRecente = activitatiRecente;

  vm.activitateaMea = activitateaMea;

  vm.proiecteleMele = proiecteleMele;
}
