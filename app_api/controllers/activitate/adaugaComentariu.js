var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;
  var activitateId = req.params.activitateId;
  
  /* executa callback daca exista user logat si face parte din proiect.  */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    if (activitateId) {
      var userId = parseInt(req.body.userComentariu);
      var textComentariu = req.body.textComentariu;

      Proiect
        .findById(proiectId)
        .exec(function(err, proiect) {
          var membruGasit = proiect.membri.filter(membru => membru.membru === userId).length || (proiect.managerProiect === userId); 
          var activitateProiect = proiect.activitati.filter(activitate => activitate.activitateId === parseInt(activitateId)).length;  
         
          if (!membruGasit) {
            sendJSONResponse(res, 404, {
              "message": "Autorul comentariului nu exista in proiect!"
            });

            return;
          }

          else if (!activitateProiect) {
            sendJSONResponse(res, 404, {
              "message": "Activitatea nu exista in proiect!"
            });

            return;
          }

          else {
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

                var comentariuNou = {
                  userId: userId,
                  textComentariu: textComentariu
                }

                activitate.comentarii.push(comentariuNou);
      
                activitate.save(function(err, activitate) {
                  var comentariuAdaugat = activitate.comentarii[activitate.comentarii.length - 1];
                  
                  if (err) {
                    sendJSONResponse(res, 400, err);
      
                    return;
                  }

                  
                  else {
                    sendJSONResponse(res, 201, {
                      "message": "Comentariul a fost adaugat.",
                      "comentariu": comentariuAdaugat
                    });
                  }
                });
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
