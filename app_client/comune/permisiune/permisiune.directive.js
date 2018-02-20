module.exports = function permisiune(autentificare, $routeParams) {
  return {
    restrict: 'A',
    scope: {
      roluri: '=permisiune'
    },
    link: function (scope, element, attrs) {
      var proiectId = $routeParams.proiectId;

      scope.$watch(autentificare.userConectat, function() {
        if (autentificare.verificaPermisiuniView(scope.roluri, proiectId)) {
          element[0].style.display = 'block';
        } 
        
        else {
          element[0].style.display = 'none';
        }
      });
    }
  };
};
