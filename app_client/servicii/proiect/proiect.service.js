module.exports = function proiect($http, autentificare) {
  /* Cerere POST catre API pentru a crea un proiect nou. Necesita autentificare cu token. */
  var creare = function (data) {
    return $http.post('/api/proiect/creare-proiect', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere POST catre API pentru a adauga etape la un proiect. Necesita autentificare cu token. */
  var alegeEtape = function (proiectId, data) {
    return $http.post('/api/proiect/' + proiectId + '/alege-etape', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere POST catre API pentru a adauga membrii la un proiect. Necesita autentificare cu token. */
  var alegeMembru = function (proiectId, data) {
    return $http.post('/api/proiect/' + proiectId + '/alege-membru', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    creare: creare,
    alegeEtape: alegeEtape,
    alegeMembru: alegeMembru
  };
};
