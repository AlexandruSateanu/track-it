var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Verify = mongoose.model('Verify');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.email || !req.body.numeIntreg || !req.body.parola || !req.body.parolaConfirmare) {
    sendJSONResponse(res, 400, {
      "message": "All fields required"
    });
  
    return;
  } else if (req.body.parola !== req.body.parolaConfirmare) {
    sendJSONResponse(res, 400, {
      "message": "Passwords do not match"
    });

    return;
  }

  var user = new User();
  user.numeIntreg = req.body.numeIntreg;
  user.email = req.body.email;
  user.setPassword(req.body.parola);

  user.save(function(err) {
    var token;

    if (err) {
      sendJSONResponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONResponse(res, 200, {
        "token" : token
      });
    }
  });
};

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.parola) {
    sendJSONResponse(res, 400, {
    "message": "All fields required"
  });

    return;
  }

  passport.authenticate('local', function(err, user, info) {
    var token;
  
    if (err) {
      sendJSONResponse(res, 404, err);
      return;
    }
  
    if(user) {
      token = user.generateJwt();
      sendJSONResponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONResponse(res, 401, info);
    }
  })(req, res);
};
