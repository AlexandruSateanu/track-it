module.exports = function proiect($http, autentificare) {
  /* Cerere POST catre API pentru a crea un proiect nou. Necesita autentificare cu token. */
  var creare = function(data) {
    return $http.post('/api/proiect/creare-proiect', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere POST catre API pentru a adauga etape la un proiect. Necesita autentificare cu token. */
  var alegeEtape = function(proiectId, data) {
    return $http.post('/api/proiect/' + proiectId + '/alege-etape', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere POST catre API pentru a adauga membrii la un proiect. Necesita autentificare cu token. */
  var alegeMembru = function(proiectId, data) {
    return $http.post('/api/proiect/' + proiectId + '/alege-membru', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere GET catre API pentru informatiile despre un proiect. Necesita autentificare cu token. */
  var infoProiect = function(proiectId) {
    return $http.get('/api/proiect/' + proiectId + '/info-proiect', {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere PUT catre API pentru a edita perioada proiectului. Necesita autentificare cu token. */
  var editarePerioada = function(proiectId, data) {
    return $http.put('/api/proiect/' + proiectId + '/editeaza-perioada', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere PUT catre API pentru a edita o etapa a proiectului. Necesita autentificare cu token. */
  var editareEtapa = function(proiectId, data) {
    return $http.put('/api/proiect/' + proiectId + '/editeaza-etape', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere PUT catre API pentru a edita un membru al proiectului. Necesita autentificare cu token. */
  var editareMembru = function(proiectId, data) {
    return $http.put('/api/proiect/' + proiectId + '/editeaza-membri', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    creare: creare,
    alegeEtape: alegeEtape,
    alegeMembru: alegeMembru,
    infoProiect: infoProiect,
    editarePerioada: editarePerioada,
    editareEtapa: editareEtapa,
    editareMembru: editareMembru
  };
};
