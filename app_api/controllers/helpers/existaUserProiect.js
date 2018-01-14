var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('./sendJSONResponse');

/* Functie care valideaza ca un user logat a facut cererea si ca face parte din proiect. */
module.exports = function(req, res, proiectId, callback) {
  if (req.payload && req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        
        if (!user) {
          sendJSONResponse(res, 404, {
            "message": "Userul nu a fost gasit."
          });

          return;
        }
        
        else if (err) {
          sendJSONResponse(res, 404, err);

          return;
        }

        /* verifica daca avem parametru cu id-ul de proiect in URL */
        if (proiectId) {
          Proiect
            .findById(proiectId)
            .select('managerProiect membri')
            .exec(function(err, proiect) {
              var userGasit = proiect.membri.filter(membru => membru.membru === req.payload._id).length || (proiect.managerProiect === req.payload._id);
  
              if (!userGasit) {
                sendJSONResponse(res, 403, {
                  "message": "Userul nu face parte din proiect."
                });
  
                return;
              }
  
              callback(req, res, user);
            });
        }

        else {
          sendJSONResponse(res, 404, {
            "message": "Nu exista id de proiect in request."
          });
    
          return;
        }
      });
  }
  
  else {
    sendJSONResponse(res, 404, {
      "message": "Userul nu a fost gasit."
    });
    
    return;
  }
};
