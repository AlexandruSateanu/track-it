module.exports = function useri($http, autentificare) {
  /* Cerere GET catre API pentru o lista cu toti userii existenti. Necesita autentificare cu token. */
  var listaUseri = function () {
    return $http.get('/api/lista-useri', {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere GET catre API pentru o lista cu toate rolurile posibile. Necesita autentificare cu token. */
  var listaRoluri = function () {
    return $http.get('/api/lista-roluri', {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere GET catre API pentru lista proiectelor unui user. Necesita autentificare cu token. */
  var listaProiecteUser = function(userId) {
    return $http.get('/api/lista-proiecte-user/' + userId, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  /* Cerere GET catre API pentru lista activitatilor unui user. Necesita autentificare cu token. */
  var listaActivitatiUser = function(userId) {
    return $http.get('/api/lista-activitati-user/' + userId, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    listaUseri: listaUseri,
    listaRoluri: listaRoluri,
    listaProiecteUser: listaProiecteUser,
    listaActivitatiUser: listaActivitatiUser
  };
};
