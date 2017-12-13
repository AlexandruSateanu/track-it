module.exports = function confirmationCtrl($location, autentificare) {
  var vm = this;

  vm.antetPagina = {
    titlu: 'Confirmare cont'
  }

  vm.statusConfirmare = '';
  vm.token = $location.search().token;

  var confirmaCont = function () {
    autentificare
      .confirmare(vm.token)
      .then(function(response) {
        vm.statusConfirmare = response.data.message;
      }, function(response) {
        vm.statusConfirmare = response.data.message;
      });
  };

  confirmaCont();
}
