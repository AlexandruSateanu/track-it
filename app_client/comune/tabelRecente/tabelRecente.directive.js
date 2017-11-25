module.exports = function tabelRecente() {
  return {
    restrict: 'EA',
    scope: {
      recente: '=recente'
    },
    templateUrl: '/comune/tabelRecente/tabelRecente.template.html'
  };
}
