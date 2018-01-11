module.exports = function useri($http, autentificare) {
  /* Cerere GET catre API pentru o lista cu toate statusurile posibile. Necesita autentificare cu token. */
  var listaStatus = function () {
    return $http.get('/api/lista-status', {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere POST catre API pentru a crea o activitate noua. Necesita autentificare cu token. */
  var creare = function(proiectId, data) {
    return $http.post('/api/proiect/' + proiectId + '/creare-activitate', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    listaStatus: listaStatus,
    creare: creare
  };
};
