module.exports = function tabelMembri() {
  return {
    restrict: 'EA',
    scope: {
      membri: '='
    },
    templateUrl: '/comune/tabelMembri/tabelMembri.template.html'
  };
}
