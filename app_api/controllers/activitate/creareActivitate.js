var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

var status = require('../../config/status');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat si face parte din proiect.  */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    var responsabil = parseInt(req.body.responsabil);
    var etapaId = null;
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId) {
      Proiect
        .findById(proiectId)
        .exec(function(err, proiect) {
          if (req.body.etapa) {
            etapaId = req.body.etapa;
            
            if (proiect.tipProiect === '1') {
              /* Extrage etapa de care apartine activitatea. */
              var etapa = proiect.etape.id(etapaId);
  
              /* Verifica existenta etapei. */
              if (!etapa) {
                sendJSONResponse(res, 404, {
                  "message": "Etapa nu exista in proiect!"
                });
  
                return;
              }
            }
          }

          /* Verifica existenta responsabilului. */
          var membruGasit = proiect.membri.filter(membru => membru.membru === responsabil).length || (proiect.managerProiect === responsabil);
          
          if (!membruGasit) {
            sendJSONResponse(res, 404, {
              "message": "Responsabilul nu exista in proiect!"
            });

            return;
          }
            
          else {
            /* Salveaza activitatea noua */
            Activitate.create({
              numeActivitate: req.body.numeActivitate,
              responsabil: responsabil,
              proiectId: proiectId,
              etapaId: etapaId,
              status: 0,
              estimare: req.body.estimare,
              descriere: req.body.descriere
            }, function(err, activitate) {
              
              if (err) {
                sendJSONResponse(res, 400, err);

                return;
              }

              var codActivitate = proiect.cheieProiect + '-' + (proiect.activitati.length + 1);

              proiect.activitati.push({
                activitateId: activitate._id,
                cod: codActivitate
              });

              proiect.save(function(err, proiect) {
                
                if (err) {
                  sendJSONResponse(res, 400, err);


                  return;
                } 
                
                else {
                  User.findByIdAndUpdate(
                    responsabil,
                    { $push: { "activitati" : { activitateId: activitate._id } } },
                    { safe: true, new : true },
                    function(err) {
                      
                      if (err) {
                        sendJSONResponse(res, 400, err);

                        return;
                      } 
                      
                      else {
                        /* Daca activitatea a fost creata cu succes, trimitem raspuns */
                        sendJSONResponse(res, 201, {
                          "message": "Activitatea a fost creata.",
                          "activitate": activitate
                        });
                      }
                    }
                  );
                }
              });
            });
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
