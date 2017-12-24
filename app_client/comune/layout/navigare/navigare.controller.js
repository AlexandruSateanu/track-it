module.exports = function navigationCtrl($location, autentificare) {
  var vm = this;
  
  vm.caleCurrenta = $location.path();

  vm.userConectat = autentificare.userConectat();
  vm.userCurrent = autentificare.userCurrent();

  vm.deconectare = function() {
    autentificare.deconectare();
    $location.path('/');
  };
}
