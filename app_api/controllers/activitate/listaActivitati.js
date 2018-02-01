var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    Proiect
      .findById(proiectId)
      .exec(function(err, proiect) {
        if (!proiect) {
          sendJSONResponse(res, 404, {
            "message": "Proiectul nu a fost gasit"
          });
    
          return;
        }
    
        else if (err) {
          sendJSONResponse(res, 404, err);
    
          return;
        }

        Activitate
          .find({}, function(err, activitati) {
            var listaActivitati = [];

            /* Parcurgem lista de activitati si verificam ca fac parte din proiect. */
            activitati.forEach((activitate, index) => {
              proiect.activitati.forEach(function(activitateProiect) {
                if (activitate._id === activitateProiect.activitateId) {
                  var activitateDeAdaugat = {
                    _id: activitate._id,
                    numeActivitate: activitate.numeActivitate,
                    responsabil: activitate.responsabil,
                    dataStart: activitate.dataStart,
                    dataFinalizare: activitate.dataFinalizare,
                    status: activitate.status,
                    updatedAt: activitate.updatedAt,
                    proiectId: activitate.proiectId,
                    cod: activitateProiect.cod
                  };

                  listaActivitati.push(activitateDeAdaugat);
                }
              });
            });

            sendJSONResponse(res, 200, {
              "listaActivitati": listaActivitati
            });
          });
      });
  });
};
