module.exports = function navigation () {
  return {
    restrict: 'EA',
    scope: {
      statistici: '=statistici'
    },
    templateUrl: '/comune/tabelStatistici/tabelStatistici.template.html'
  };
}
