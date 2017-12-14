var passport = require('passport');
var sendJSONResponse = require('../helpers/sendJSONResponse');

module.exports = function(req, res) {
  if(!req.body.email || !req.body.parola) {
    sendJSONResponse(res, 400, {
      "message": "Toate campurile sunt obligatorii."
    });

    return;
  }

  /* Logam userul prin metoda passport cu strategia locala. */
  passport.authenticate('local', function(err, user, info) {
    var token;
  
    if (err) {
      sendJSONResponse(res, 404, err);
      return;
    }

    if(user) {
      /* Generam un JSON Web Token nou si il trimitem ca raspuns. */
      token = user.generateJwt();
      sendJSONResponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONResponse(res, 401, info);
      return;
    }
  })(req, res);
};
