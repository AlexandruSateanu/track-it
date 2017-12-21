var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONResponse = require('./sendJSONResponse');

/* Functie care valideaza ca un user logat a facut cererea si executa apoi callback. */
module.exports = function(req, res, callback) {
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

        callback(req, res, user);
      });
  }
  
  else {
    sendJSONResponse(res, 404, {
      "message": "Userul nu a fost gasit."
    });
    
    return;
  }
};
