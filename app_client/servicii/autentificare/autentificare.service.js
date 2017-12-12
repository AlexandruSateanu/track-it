module.exports = function autentificare($window, $http) {
  var saveToken = function (token) {
    $window.localStorage['track-it-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['track-it-token'];
  }; 

  var register = function(user) {
    return $http.post('/api/register', user).then(function(response) {
      saveToken(response.data.token);
    });
  };
  
  var conectare = function(user) {
    return $http.post('/api/login', user).then(function(response) {
      saveToken(response.data.token);
    });
  };

  var deconectare = function () {
    $window.localStorage.removeItem('track-it-token');
  };

  var userLogat = function() {
    var token = getToken();
    
    if(token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var userCurrent = function() {
    if(userLogat()) {
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      
      return {
        email : payload.email,
        numeIntreg : payload.numeIntreg
      };
    }
  };

  return {
    saveToken : saveToken,
    getToken : getToken,
    register : register,
    conectare : conectare,
    deconectare : deconectare,
    userLogat : userLogat,
    userCurrent : userCurrent
  };
};
