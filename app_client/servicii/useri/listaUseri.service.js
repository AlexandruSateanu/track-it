module.exports = function listaUseri($http, autentificare) {
  var creare = function (data) {
    return $http.get('/api/lista-useri', {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    listaUseri: listaUseri
  };
};
