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
    return verificaAccesProiect(ruta, proiectId);
  };

  /* Verifica daca userul are acces la proiect. */
  var verificaAccesProiect = function(ruta, proiectId) {
    if (!userConectat()) {
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
          if (!ruta.necesitaRol) {
            return true;
          }

          else {
            return verificaRol(ruta, proiectId, userId);
          }
        }
  
        /* Cazul in care userul e manager de proiect. */
        else if (proiect.managerProiect === userId) {
          if (!ruta.necesitaRol) {
            return true;
          }

          else {
            return verificaRol(ruta, proiectId, userId);
          }
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

  var verificaRol = function(ruta, proiectId, userId) {
    var roluriNecesare = ruta.necesitaRol;

    /* Verificam daca userul cu userId are rolul necesar in proiect. */
    var verificare = function() {
      return $http.get('/api/lista-roluri-proiecte-user/' + userId, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      }).then(function(response) {
        var listaProiecte = response.data.listaRoluriProiecteUser;

        var proiectCautat = listaProiecte.filter(function(proiect) {
          return proiect.proiect === parseInt(proiectId);
        })[0];

        if (roluriNecesare.indexOf(proiectCautat.rol) !== -1) {
          return true;
        }

        else {
          return false;
        }
      }, function(response) {
        return false;
      });
    }

    return verificare().then(function(rezultat) {
      return rezultat;
    });
  };

  var verificaPermisiuniView = function(roluri, proiectId) {
    if (!userConectat()) {
      return false;
    }

    var proiecteUser = userCurrent().proiecte;    

    var proiectCautat = proiecteUser.filter(function(proiect) {
      return proiect.proiect === parseInt(proiectId);
    })[0];

    var gasitPermisiuni = false;

    angular.forEach(roluri, function(rol) {
      if (proiectCautat.rol === rol) {
        gasitPermisiuni = true;
        return;
      }                
    });

    return gasitPermisiuni;
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
    verificaAccesProiect : verificaAccesProiect,
    verificaRol : verificaRol,
    verificaPermisiuniView : verificaPermisiuniView
  };
};
