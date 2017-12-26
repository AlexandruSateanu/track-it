var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

var roluri = require('../../config/roluri');


module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    
    /* Salveaza proiect nou */
    Proiect.create({
      numeProiect: req.body.numeProiect,
      cheieProiect: req.body.cheieProiect,
      tipProiect: req.body.tipProiect,
      managerProiect: user._id,
      dataStart: req.body.dataStart,
      dataSfarsit: req.body.dataSfarsit
    }, function(err, proiect) {
      
      if (err) {
        sendJSONResponse(res, 400, err);
      } 
      
      else {
        /* Extrage doar rolul de Manager de Proiect */
        var rolPM = roluri.filter(rol => rol.rol === 'Manager Proiect');
        var rolPMId = rolPM[0].rolId;

        /* Salveaza referinta catre proiect si in userul care l-a creat si atribuie rol de Project Manager */
        User.findByIdAndUpdate(
          user._id,
          { $push: { 'proiecte' : { proiect: proiect._id, rol: rolPMId } } },
          {safe: true, new : true},
          function(err) {
            
            if (err) {
              sendJSONResponse(res, 400, err);
            } 
            
            else {
              /* Daca proiectul a fost creat cu succes, il trimitem ca raspuns */
              sendJSONResponse(res, 201, {
                "message": "Proiectul a fost creat.",
                "proiect": proiect
              });
            }
          }
        );
      }
    });
  });
};
