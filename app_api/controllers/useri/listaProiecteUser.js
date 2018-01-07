var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    var userId = req.params.userId;
    
    /* verifica daca avem parametru cu id-ul de user in URL */
    if (userId) {
      /* Selecteaza user dupa id-ul dat */
      User
        .findById(userId)
        .select('proiecte')
        .exec(function(err, user) {
      
          if (!user) {
            sendJSONResponse(res, 404, {
              "message": "Userul nu a fost gasit"
            });
      
            return
          }
      
          else if (err) {
            sendJSONResponse(res, 404, err);
      
            return;
          }

          /* Extragem lista cu proiecte ale userului. */
          var proiecteUser = user.proiecte;
          
          /* Selectam toate proiectele existente. */
          Proiect
            .find({}, function(err, proiecteTotale) {
              if (err) {
                sendJSONResponse(res, 404, err);
                
                return;
              }
              
              var listaProiecte = [];

              /* Parcurge proiectele user-ului si extrage toate datele din colectia de proiecte. */
              proiecteUser.forEach(proiectUser => {
                var proiectGasit = proiecteTotale.filter(proiect => {
                  return proiect._id === proiectUser.proiect;
                });

                listaProiecte.push(proiectGasit[0]);
              });

              sendJSONResponse(res, 200, {
                "listaProiecte": listaProiecte
              });
            });
        });
    }

    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de proiect in request."
      });
    }
  });
};
