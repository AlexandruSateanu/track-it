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

  /* Cerere GET catre API pentru o a primi un document de activitate dintr-un proiect. Necesita autentificare cu token. */
  var infoActivitate = function (proiectId, activitateId) {
    return $http.get('/api/proiect/' + proiectId + '/activitate/' + activitateId, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere PUT catre API pentru a edita statusul unei activitati. Necesita autentificare cu token. */
  var schimbaStatus = function (proiectId, activitateId, data) {
    return $http.put('/api/proiect/' + proiectId + '/activitate/' + activitateId + '/schimba-status', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere PUT catre API pentru a edita o activitate. Necesita autentificare cu token. */
  var editeazaActivitate = function (proiectId, activitateId, data) {
    return $http.put('/api/proiect/' + proiectId + '/activitate/' + activitateId + '/editeaza-activitate', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere DELETE catre API pentru a sterge o activitate. Necesita autentificare cu token. */
  var stergeActivitate = function (proiectId, activitateId) {
    return $http.delete('/api/proiect/' + proiectId + '/activitate/' + activitateId + '/sterge-activitate', {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    listaStatus: listaStatus,
    creare: creare,
    infoActivitate: infoActivitate,
    schimbaStatus: schimbaStatus,
    editeazaActivitate: editeazaActivitate,
    stergeActivitate: stergeActivitate
  };
};
