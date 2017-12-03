var proiect = {
  proiect1: {
    id: 1,
    numeProiect: "Proiect 1",
    cheieProiect: 'PRJ',
    tipProiect: 1,
    projectManager: "Alex Sateanu",
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
  }
};

var roluri = [
  {
    rolId: 1,
    rol: "Coordonator echipa"
  },
  {
    rolId: 2,
    rol: "Membru echipa"
  },
  {
    rolId: 3,
    rol: "Consultant"
  },
  {
    rolId: 4,
    rol: "Vizitator"
  },
];

module.exports = function setariProiectCtrl() {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Setari Proiect'
  };

  vm.tipProiect = proiect.proiect1.tipProiect;

  vm.setariEtape = true;

  if (vm.tipProiect === 2) {
    vm.setariEtape = false;
  }
};
