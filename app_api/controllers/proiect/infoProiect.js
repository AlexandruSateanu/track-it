var mongoose = require('mongoose');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId) {
      /* Selecteaza proiectul dupa id-ul dat */
      Proiect
        .findById(proiectId)
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
          
          sendJSONResponse(res, 200, {
            "proiect": proiect
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
