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
    
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  /* Citirea din token a informatiilor despre user. */
  var userCurrent = function() {
    if (userConectat()) {
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
  
      return {
        userId: payload._id,
        email: payload.email,
        numeIntreg: payload.numeIntreg,
        proiecte: payload.proiecte
      };
    }
  };

  /* Verificare daca ruta necesita autentificare. */
  var verificaPermisiuniRuta = function(ruta, proiectId) {
    if (!ruta.necesitaAuthentificare) {
      return true;
    }
    
    /* Pasam la urmatoarea metoda informatia despre ruta si id-ul de proiect. */
    return verificaAutentificareRuta(ruta, proiectId);
  };
  
  /* Daca ruta necesita autentificare, verifica daca userul e conectat. */
  var verificaAutentificareRuta = function(ruta, proiectId) {

    if (!userConectat()) {
      return false;
    }
    
    /* Daca userul e conectat, verifica daca ruta necesita acces la proiect. */
    if (!ruta.necesitaAccesProiect) {
      return true;
    }
    
    /* Pasam la urmatoarea metoda id-ul de proiect. */
    return verificaAccesProiect(proiectId);
  };

  /* Verifica daca userul are acces la proiect. */
  var verificaAccesProiect = function(proiectId) {
    if (!userConectat()){
      return false;
    }

    /* Extrage id-ul userului curent din token. */
    var userId = userCurrent().userId;

    /* Verificam daca userul conectat face parte din proiectul cu id-ul primit. */
    var verificare = function() {
      return $http.get('/api/proiect/' + proiectId + '/info-proiect', {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      })
      .then(function(response) {
        var proiect = response.data.proiect;
        
        var membruGasit = proiect.membri.filter(function(membru) {
          return membru.membru === userId;
        });

        if (membruGasit.length > 0) {
          return true;
        }
  
        /* Cazul in care userul e manager de proiect. */
        else if (proiect.managerProiect === userId) {
          return true;
        }
  
        else {
          return false;
        }
      }, function(response) {
        return false;
      });
    };
    
    return verificare().then(function(rezultat) {
      return rezultat;
    });
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
    userCurrent : userCurrent,
    verificaPermisiuniRuta : verificaPermisiuniRuta,
    verificaAutentificareRuta : verificaAutentificareRuta,
    verificaAccesProiect : verificaAccesProiect
  };
};
