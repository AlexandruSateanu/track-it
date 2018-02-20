var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    var userId = req.params.userId;
    
    /* verifica daca avem parametru cu id-ul de user in URL */
    if (userId) {
      /* Selecteaza user dupa id-ul dat */
      User
        .findById(userId)
        .select('proiecte')
        .exec(function(err, user) {
      
          if (!user) {
            sendJSONResponse(res, 404, {
              "message": "Userul nu a fost gasit"
            });
      
            return
          }
      
          else if (err) {
            sendJSONResponse(res, 404, err);
      
            return;
          }

          /* Extragem lista cu proiecte ale userului. */
          var proiecteUser = user.proiecte;

          sendJSONResponse(res, 200, {
            "listaRoluriProiecteUser": proiecteUser
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
