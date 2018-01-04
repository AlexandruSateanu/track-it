module.exports = function setariProiectCtrl(proiect, $routeParams) {
  var vm = this;

  var proiectId = $routeParams.proiectId;

  /* Cere detalii despre proiect si extrage tipul si numele proiectului. */
  proiect
    .infoProiect(proiectId)
    .then(function(response) {
      vm.tipProiect = response.data.proiect.tipProiect;
      vm.numeProiect = response.data.proiect.numeProiect;

      vm.antetPagina = {
        titlu: 'Setari Proiect - ' + vm.numeProiect
      };

      vm.setariEtape = true;

      /* Ascundere tab etape daca proiectul este de tip fara etape. */
      if (vm.tipProiect === '2') {
        vm.setariEtape = false;
      }
    }, function(response) {
      return null;
    });
};
