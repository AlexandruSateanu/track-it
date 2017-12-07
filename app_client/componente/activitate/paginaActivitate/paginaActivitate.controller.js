var activitate = {
  activitate1: {
    id: 1234,
    cod: "PR1-123",
    numeActivitate: "Activitate 2",
    idProiect: 1,
    responsabil: 'Cristina Ungureanu',
    etapa: 'Etapa unu',
    prioritate: 'Majora',
    estimare: '2',
    descriere: 'Balskkj asdldf asdwqdkna asdasdjk asd asd asdlefwefl wqfnjewefeow.',
    data: "23 03 2016, 11:00"
  },
};

module.exports = function paginaActivitateCtrl() {
  var vm = this;

  vm.activitate = activitate;

  vm.antetActivitate = {
    titlu: vm.activitate.numeActivitate,
    cod: vm.activitate.cod
  };
}
