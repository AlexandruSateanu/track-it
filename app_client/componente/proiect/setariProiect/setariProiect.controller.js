module.exports = function setariProiectCtrl(proiect, $routeParams) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Setari Proiect'
  };

  var proiectId = $routeParams.proiectId;

  /* Cere detalii despre proiect si extrage tipul de proiect. */
  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      vm.tipProiect = response.data.proiect.tipProiect;
    }, function(response) {
      return null;
    });

  vm.setariEtape = true;

  /* Ascundere tab etape daca proiectul este de tip fara etape. */
  if (vm.tipProiect === 2) {
    vm.setariEtape = false;
  }
};
