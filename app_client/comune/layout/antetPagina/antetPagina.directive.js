module.exports = function antetPagina() {
  return {
    restrict: 'EA',
    scope: {
      content : '='
    },
    templateUrl: '/comune/layout/antetPagina/antetPagina.template.html'
  };
};
