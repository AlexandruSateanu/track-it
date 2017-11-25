module.export = function antetPagina () {
  return {
    restrict: 'EA',
    scope: {
      content : '=content'
    },
    templateUrl: '/comune/layout/antetPagina/antetPagina.template.html'
  };
};
