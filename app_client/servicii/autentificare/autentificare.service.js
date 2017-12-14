module.exports = function autentificare($window, $http) {
  var saveToken = function (token) {
    $window.localStorage['track-it-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['track-it-token'];
  }; 

  var register = function(user) {
    return $http.post('/api/register', user);
  };

  var confirmare = function(token) {
    return $http.post('/api/confirmation', token);
  };
  
  var conectare = function(user) {
    return $http.post('/api/login', user).then(function(response) {
      saveToken(response.data.token);
    });
  };
  
  var deconectare = function () {
    $window.localStorage.removeItem('track-it-token');
  };
  
  var adminCreareUser = function(user) {
    return $http.post('/api/admin/creare-user', user);
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
    confirmare : confirmare,
    conectare : conectare,
    deconectare : deconectare,
    adminCreareUser : adminCreareUser,
    userLogat : userLogat,
    userCurrent : userCurrent
  };
};
