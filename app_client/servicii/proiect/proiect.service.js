module.exports = function proiect($http, autentificare) {
  var creare = function (data) {
    return $http.post('/api/proiect/creare-creare', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    creare: creare
  };
};
