var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;
  var activitateId = req.params.activitateId;
  var etapaId = null;
  
  /* executa callback daca exista user logat si face parte din proiect.  */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    if (activitateId) {
      var responsabil = parseInt(req.body.responsabil);

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
                  "message": "Noua etapa nu exista in proiect!"
                });
  
                return;
              }
            }
          }

          if (responsabil) {
            /* Verifica existenta noului responsabil. */
            var membruGasit = proiect.membri.filter(membru => membru.membru === responsabil).length || (proiect.managerProiect === responsabil);
            
  
            if (!membruGasit) {
              sendJSONResponse(res, 404, {
                "message": "Noul responsabilul nu exista in proiect!"
              });
  
              return;
            }
          }
        });

      Activitate
        .findById(activitateId)
        .exec(function(err, activitate) {
          if (!activitate) {
            sendJSONResponse(res, 404, {
              "message": "Activitatea nu a fost gasita!"
            });
  
            return
          }

          if (err) {
            sendJSONResponse(res, 400, err);
  
            return;
          }

          else {
            if (req.body.numeActivitate) {
              activitate.numeActivitate = req.body.numeActivitate;
            }

            if (req.body.estimare) {
              activitate.estimare = req.body.estimare;
            }

            if (req.body.descriere) {
              activitate.descriere = req.body.descriere;
            }

            if (responsabil) {
              var responsabilVechi = activitate.responsabil;

              User.findByIdAndUpdate(
                responsabilVechi,
                { $pull: { "activitati": { activitateId: activitateId } } },
                function(err) {
                  if (err) {
                    sendJSONResponse(res, 400, err);
                    
                    return;
                  } 
                  
                  else {
                    User.findByIdAndUpdate(
                      responsabil,
                      { $push: { "activitati" : { activitateId: activitateId } } },
                      { safe: true, new : true },
                      function(err) {
                        if (err) {
                          sendJSONResponse(res, 400, err);
      
                          return;
                        }
                      });
                  }
                });

              activitate.responsabil = responsabil;
            }

            if (etapaId) {
              activitate.etapaId = etapaId;
            }
  
            activitate.save(function(err, activitate) {
              if (err) {
                sendJSONResponse(res, 400, err);
  
                return;
              } 
              
              else {
                sendJSONResponse(res, 201, {
                  "message": "Activitatea a fost editata.",
                  "activitate": activitate
                });
              }
            });
          }
        });
    }

    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de activitate in request."
      });

      return;
    }
  });
};
