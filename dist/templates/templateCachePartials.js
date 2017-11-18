(function(module) {
try {
  module = angular.module('trackitPartials');
} catch (e) {
  module = angular.module('trackitPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/home.view.html',
    '<navigation></navigation>\n' +
    '<div class="container">\n' +
    '  <div class="row">\n' +
    '    <div class="col-xs-12 col-sm-8">\n' +
    '      <h1>{{ vm.message }}</h1>\n' +
    '      <h2>\n' +
    '        <span>Test</span>\n' +
    '      </h2>\n' +
    '      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam et tempore dicta eos iusto cum itaque qui architecto alias aperiam autem maxime assumenda, inventore unde est nam optio aut at.</p>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <footer-generic></footer-generic>\n' +
    '</div>\n' +
    '');
}]);
})();
