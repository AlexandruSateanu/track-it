var mongoose = require('mongoose');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat si daca face parte din proiect. */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    
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
            sendJSONResponse(res, 404, err);
  
            return;
          }
          
          /* Extrage etapele din body-ul POST */
          req.body.forEach(etapa => {
            proiect.etape.push({
              numeEtapa: etapa.numeEtapa,
              dataStart: etapa.dataStart,
              dataSfarsit: etapa.dataSfarsit
            });
          });

          /* Salveaza noul proiect cu noile etape */
          proiect.save(function(err, proiect) {
            if (err) {
              sendJSONResponse(res, 400, err);

              return;
            } 
            
            else {
              sendJSONResponse(res, 200, {
                "message": "Etapele au fost salvate.",
                "etape": proiect.etape
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
