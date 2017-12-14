module.exports = function navigationCtrl($location, autentificare) {
  var vm = this;
  
  vm.caleCurrenta = $location.path();

  vm.userLogat = autentificare.userLogat();
  vm.userCurrent = autentificare.userCurrent();

  vm.deconectare = function() {
    autentificare.deconectare();
    $location.path('/');
  };
}
