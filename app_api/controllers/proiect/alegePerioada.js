var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

var roluri = require('../../config/roluri');

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
          
          /* Extrage perioada din body-ul POST */
          proiect.perioada.dataStart = req.body.dataStart;
          proiect.perioada.dataSfarsit = req.body.dataSfarsit;

          /* Salveaza noul proiect cu noile perioade */
          proiect.save(function(err, proiect) {
            if (err) {
              sendJSONResponse(res, 404, err);
            } 
            
            else {
              sendJSONResponse(res, 200, {
                "message": "Perioada a fost salvata.",
                "proiect": proiect
              });
            }
          });
        });
    } else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de proiect in request."
      })
    }
  });
};
