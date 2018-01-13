var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat si face parte din proiect. */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId) {
      /* Selecteaza proiectul dupa id-ul dat */
      Proiect
        .findById(proiectId)
        .select('membri managerProiect')
        .exec(function(err, proiect) {
      
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit"
            });
      
            return;
          }
      
          else if (err) {
            sendJSONResponse(res, 404, err);
      
            return;
          }

          var membriProiect = [];
          
          User.find({}, function(err, useri) {
            if (err) {
              sendJSONResponse(res, 404, err);
      
              return;
            }
            
            /* Parcurgem lista de user si verificam ca fac parte din proiect. */
            useri.forEach(user => {
              proiect.membri.forEach(function(membru, index) {
                if (user._id === membru.membru) {
                  membriProiect.push({
                    userId: user._id,
                    numeIntreg: user.numeIntreg
                  });
                }
              });
            });

            useri.forEach(user => {
              if (user._id === proiect.managerProiect) {
                membriProiect.push({
                  userId: user._id,
                  numeIntreg: user.numeIntreg
                });
              }
            });

            sendJSONResponse(res, 200, {
              "membriProiect": membriProiect
            });
          });
        });
    }

    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de proiect in request."
      });

      return;
    }
  });
};
