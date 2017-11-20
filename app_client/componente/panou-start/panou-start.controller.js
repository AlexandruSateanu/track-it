var proiecte = {
  proiect1: {
    nume: "Proiect 1",
    rol: "Manager Proiect"
  },
  proiect2: {
    nume: "Proiect 2",
    rol: "Consultant"
  }
}

var activitati = {
  activitate1: {
    name: "Activitatea numarul unu",
    date: "23-20-2017",
    log: "2 ore"
  },
  activitate2: {
    name: "Activitatea numarul doi",
    date: "23-20-2017",
    log: "4 ore"
  }
}

module.exports = function dashboardCtrl () {
  var vm = this;
  vm.mesaj = 'Bine ai venit!';

  vm.proiecteleMele = proiecte;

  vm.activitatiRecente = activitati;
}
