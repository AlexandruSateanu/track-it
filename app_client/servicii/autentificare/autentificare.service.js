module.exports = function autentificare($window, $http) {
  /* Salvare token in Local Storage. */
  var saveToken = function(token) {
    $window.localStorage['track-it-token'] = token;
  };

  /* Citirea token-ului salvat in Local Storage */
  var getToken = function () {
    return $window.localStorage['track-it-token'];
  }; 

  /* Cerere POST catre API pentru a crea un user nou. */
  var register = function(user) {
    return $http.post('/api/register', user);
  };

  /* Cerere POST catre API pentru a confirma un user nou. */
  var confirmare = function(token) {
    return $http.post('/api/confirmation', token);
  };
  
  /* Cerere POST catre API pentru a conecta un user. */
  var conectare = function(user) {
    return $http.post('/api/login', user).then(function(response) {
      saveToken(response.data.token);
    });
  };
  
  /* Cerere POST catre API pentru a deconecta un user. */
  var deconectare = function () {
    $window.localStorage.removeItem('track-it-token');
  };
  
  /* Cerere POST catre API facuta de Admin pentru a crea un user nou, cu confirmare imlicita. */
  var adminCreareUser = function(user) {
    return $http.post('/api/admin/creare-user', user);
  };

  /* Verificare ca avem un user conectat. */
  var userConectat = function() {
    var token = getToken();
    
    if(token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  /* Citirea din token a informatiilor despre user. */
  var userCurrent = function() {
    if(userConectat()) {
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      
      return {
        userId: payload._id,
        email: payload.email,
        numeIntreg: payload.numeIntreg
      };
    }
  };

  return {
    saveToken : saveToken,
    getToken : getToken,
    register : register,
    confirmare : confirmare,
    conectare : conectare,
    deconectare : deconectare,
    adminCreareUser : adminCreareUser,
    userConectat : userConectat,
    userCurrent : userCurrent
  };
};
