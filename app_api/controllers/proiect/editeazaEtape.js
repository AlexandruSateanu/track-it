var mongoose = require('mongoose');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    var proiectId = req.params.proiectId;
    var etapaId = req.body.etapaId;
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId && etapaId) {
      
      /* Selecteaza proiectul dupa id */
      Proiect
        .findById(proiectId)
        .select('etape')
        .exec(function(err, proiect) {
          
          /* verifica daca proiectul cu id-ul dat exista */
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit!"
            });
  
            return
          }
          
          else if (err) {
            sendJSONResponse(res, 404, err);
  
            return;
          }
          
          /* Extrage etapa care trebuie editata. */
          var etapa = proiect.etape.id(etapaId);

          /* Verifica existenta etapei si editeaza. */
          if(!etapa) {
            sendJSONResponse(res, 404, {
              "message": "Etapa nu exista!"
            });
          }

          else {
            etapa.numeEtapa = req.body.numeEtapa;
            etapa.dataStart = req.body.dataStart;
            etapa.dataSfarsit = req.body.dataSfarsit;

            /* Salveaza proiectul cu noua etapa */
            proiect.save(function(err, proiect) {
              if (err) {
                sendJSONResponse(res, 400, err);
              } 
              
              else {
                sendJSONResponse(res, 200, {
                  "message": "Etapa proiectului a fost editata.",
                  "etapa": etapa
                });
              }
            });
          }
        });
    } 
    
    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de proiect si de etapa in request."
      });
    }
  });
};
