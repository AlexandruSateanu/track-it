module.exports = function tabelRecente() {
  return {
    restrict: 'EA',
    scope: {
      recente: '='
    },
    templateUrl: '/comune/tabelRecente/tabelRecente.template.html'
  };
}
