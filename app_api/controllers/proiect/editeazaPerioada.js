var mongoose = require('mongoose');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    var proiectId = req.params.proiectId;
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId) {
      
      /* Selecteaza proiectul dupa id */
      Proiect
        .findById(proiectId)
        .select('dataStart dataSfarsit')
        .exec(function(err, proiect) {
          
          /* verifica daca proiectul cu id-ul dat exista */
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit"
            });
  
            return
          }
          
          else if (err) {
            sendJSONResponse(res, 404, err);
  
            return;
          }
          
          /* Extrage perioada noua din body-ul POST */
          proiect.dataStart = req.body.dataStart;
          proiect.dataSfarsit = req.body.dataSfarsit;

          /* Salveaza proiectul cu noua perioada */
          proiect.save(function(err, proiect) {
            if (err) {
              sendJSONResponse(res, 400, err);
            } 
            
            else {
              sendJSONResponse(res, 200, {
                "message": "Perioada proiectului a fost editata.",
                "proiect": proiect
              });
            }
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
