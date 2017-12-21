module.exports = function proiect($http, autentificare) {
  var creare = function (data) {
    return $http.post('/api/proiect/creare-proiect', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  var alegePerioada = function (proiectId, data) {
    return $http.post('/api/proiect/' + proiectId + '/alege-perioada', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    creare: creare,
    alegePerioada: alegePerioada
  };
};
