module.exports = function confirmareCtrl($location, autentificare) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Confirmare cont'
  }

  vm.statusConfirmare = '';
  vm.token = $location.search().token;

  var confirmaCont = function (token) {
    var tokenBody = {
      token: token
    };

    autentificare
      .confirmare(tokenBody)
      .then(function(response) {
        vm.statusConfirmare = response.data.message;
      }, function(response) {
        vm.statusConfirmare = response.data.message;
      });
  };

  confirmaCont(vm.token);
}
