var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;
  var activitateId = req.params.activitateId;

  /* executa callback daca exista user logat si face parte din proiect. */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    if (activitateId) {
      Activitate
        .findById(activitateId)
        .select('comentarii')
        .exec(function(err, activitate) {
          if (!activitate) {
            sendJSONResponse(res, 404, {
              "message": "Activitatea nu a fost gasita"
            });
      
            return;
          }

          else if (err) {
            sendJSONResponse(res, 404, err);
      
            return;
          }

          sendJSONResponse(res, 200, {
            "comentarii": activitate.comentarii
          });
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
