var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

module.exports = function(req, res) {
  var userId = req.params.userId;

  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    /* verifica daca avem parametru cu id-ul de user in URL */
    if (userId) {
      User
        .findById(userId)
        .select('activitati')
        .exec(function(err, user) {
          if (!user) {
            sendJSONResponse(res, 404, {
              "message": "Userul nu a fost gasit"
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

              /* Parcurgem lista de activitati si verificam ca fac parte din user. */
              activitati.forEach(activitate => {
                user.activitati.forEach(function(activitateUser) {
                  if (activitate._id === activitateUser.activitateId) {
                    var activitateDeAdaugat = {
                      _id: activitate._id,
                      numeActivitate: activitate.numeActivitate,
                      dataStart: activitate.dataStart,
                      dataFinalizare: activitate.dataFinalizare,
                      updatedAt: activitate.updatedAt
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
    }

    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de user in request."
      });
    }
  });
};
