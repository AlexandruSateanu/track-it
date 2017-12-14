var mongoose = require('mongoose');

var User = mongoose.model('User');
var Verify = mongoose.model('Verify');

var sendJSONResponse = require('../helpers/sendJSONResponse');

module.exports = function(req, res) {
  /* Verificam daca exista token. */
  Verify.findOne({ token: req.body.token }, function (err, token) {
    if (!token) {
      sendJSONResponse(res, 400, {
        'message': 'Nu s-a gasit un token valid. Posibil sa fi expirat.'
      });

      return;
    }

    /* Daca avem token, cautam userul. */
    User.findOne({ _id: token._userId }, function (err, user) {
      if (!user) {
        sendJSONResponse(res, 400, {
          'message': 'Nu s-a gasit user cu acest token.'
        });

        return;
      }

      if (user.isVerified) {
        sendJSONResponse(res, 400, {
          'message': 'Acest user a fost deja verificat'
        });

        return;
      }

      /* Marcheaza userul ca verificat si salveaza. */
      user.isVerified = true;

      user.save(function (err) {
        if (err) {
          sendJSONResponse(res, 500, {
            'message': err.message
          });

          return;
        }

        sendJSONResponse(res, 200, {
          'message': 'Contul a fost verificat. Va puteti conecta.'
        });
      });
    });
  });
};
