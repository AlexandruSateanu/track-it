module.exports = function tabelStatistici() {
  return {
    restrict: 'EA',
    scope: {
      statistici: '=statistici'
    },
    templateUrl: '/comune/tabelStatistici/tabelStatistici.template.html'
  };
};
