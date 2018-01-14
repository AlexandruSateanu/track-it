var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat si face parte din proiect. */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    var activitateId = req.params.activitateId;
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId) {
      /* Selecteaza proiectul dupa id-ul dat */
      Proiect
        .findById(proiectId)
        .select('activitati')
        .exec(function(err, proiect) {
      
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit."
            });
      
            return;
          }
      
          else if (err) {
            sendJSONResponse(res, 404, err);
      
            return;
          }

          /* verifica daca avem parametru cu id-ul de activitate in URL */
          if (activitateId) {
            /* Verifica existenta activitatii. */
            var activitate = proiect.activitati.filter(activitate => activitate.activitateId === parseInt(activitateId));

            /* Verifica existenta activitatii. */
            if (activitate.length !== 1) {
              sendJSONResponse(res, 404, {
                "message": "Activitatea nu exista in proiect."
              });

              return;
            }

            else {
              Activitate
                .findById(activitateId)
                .exec(function(err, activitate) {

                  if (!activitate) {
                    sendJSONResponse(res, 404, {
                      "message": "Activitatea nu a fost gasita."
                    });
              
                    return;
                  }
              
                  else if (err) {
                    sendJSONResponse(res, 404, err);
              
                    return;
                  }
                  
                  sendJSONResponse(res, 200, {
                    "activitate": activitate
                  });
                });
            }
          }

          else {
            sendJSONResponse(res, 404, {
              "message": "Nu exista id de activitate in request."
            });

            return;
          }
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
