var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    var activitateId = req.params.activitateId;
    var statusNou = parseInt(req.body.statusNou);

    if (!isNaN(statusNou)) {
      Activitate
        .findById(activitateId)
        .exec(function(err, activitate) {
          if (err) {
            sendJSONResponse(res, 400, err);
  
            return;
          }

          /* Updateaza data de start daca statul nou e 'In Executie'. */
          if (statusNou === 2) {
            activitate.dataStart = Date.now();
            activitate.dataFinalizare = Date.now();
          } 

          else if (statusNou === 4) {
            activitate.dataFinalizare = Date.now();
          }

          activitate.status = statusNou;

          activitate.save(function(err, activitate) {
            if (err) {
              sendJSONResponse(res, 400, err);

              return;
            } 
            
            else {
              sendJSONResponse(res, 201, {
                "message": "Statusul a fost schimbat.",
                "activitate": activitate
              });
            }
          });
        });
    }

    else {
      sendJSONResponse(res, 400, {
        "message": "Status nou invalid."
      });
    }
  });
};
