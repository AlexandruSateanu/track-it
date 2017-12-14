module.exports = function proiect($http) {
  var creare = function (data) {
    return $http.post('/api/proiect/creare', data, {
      headers: {
        Authorization: 'Bearer ' + autentificare.getToken()
      }
    });
  };

  return {
    creare: creare
  };
};
