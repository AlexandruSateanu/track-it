module.exports = function navigation () {
  return {
    restrict: 'EA',
    scope: {
      recent: '=recent'
    },
    templateUrl: '/shared/recentProject/recentProject.template.html'
  };
}
