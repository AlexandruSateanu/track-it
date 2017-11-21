module.exports = function navigation () {
  return {
    restrict: 'EA',
    scope: {
      recente: '=recente'
    },
    templateUrl: '/comune/activitatiRecente/activitatiRecente.template.html'
  };
}
