var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

var roluri = require('../../config/roluri');

module.exports = function(req, res) {
  existaUser(req, res, function (req, res, user) {
    /* Salveaza proiect nou */
    Proiect.create({
      numeProiect: req.body.numeProiect,
      cheieProiect: req.body.cheieProiect,
      tipProiect: req.body.tipProiect,
      managerProiect: user._id
    }, function(err, proiect) {
      if (err) {
        sendJSONResponse(res, 400, err);
      } else {
        /* Salveaza referinta catre proiect si in userul care l-a creat si atribuie rol de Project Manager */
        User.findByIdAndUpdate(
          user._id,
          { $push: { 'proiecte' : { proiect: proiect._id, rol: roluri[0].rolId } } },
          {safe: true, new : true},
          function(err) {
            if (err) {
              sendJSONResponse(res, 400, err);
            } else {
              sendJSONResponse(res, 201, {
                'message': 'Proiectul a fost creat.'
              });
            }
          }
        );
      }
    });
  });
};
