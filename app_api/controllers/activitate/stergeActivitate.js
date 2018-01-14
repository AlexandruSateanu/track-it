var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;
  var activitateId = req.params.activitateId;

  /* executa callback daca exista user logat si face parte din proiect.  */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    if (activitateId) {
      Proiect
        .findByIdAndUpdate(
          proiectId,
          { $pull: { "activitati" : { activitateId: activitateId } } },
          { safe: true, new : true },
          function(err) {
            if (err) {
              sendJSONResponse(res, 400, err);

              return;
            }
          });

      Activitate
        .findById(activitateId)
        .exec(function(err, activitate) {
          if (err) {
            sendJSONResponse(res, 400, err);

            return;
          }

          var responsabil = activitate.responsabil;

          User
            .findByIdAndUpdate(
              responsabil,
              { $pull: { "activitati": { activitateId: activitateId } } },
              function(err) {
                if (err) {
                  sendJSONResponse(res, 400, err);
                  
                  return;
                }
              });

          activitate.remove(function(err, activitate) {
            if (err) {
              sendJSONResponse(res, 400, err);

              return;
            } 
            
            else {
              sendJSONResponse(res, 204, {
                "message": "Activitatea a fost stearsa."
              });
            }
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
