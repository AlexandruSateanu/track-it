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
        .exec(function(err, proiect) {
          
          /* verifica daca proiectul cu id-ul dat exista */
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit"
            });
  
            return
          } 
          
          else if (err) {
            sendJSONResponse(res, 400, err);
  
            return;
          }
          
          /* TO DO */

          /* Salveaza noul proiect cu noii membri */
          proiect.save(function(err, proiect) {
            if (err) {
              sendJSONResponse(res, 404, err);
            } 
            
            else {
              sendJSONResponse(res, 200, {
                "message": "Membrii au fost salvati.",
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
    }
  });
};
