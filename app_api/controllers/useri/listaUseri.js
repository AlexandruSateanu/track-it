var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    
    /* Selecteaza toti userii */
    User.find({}, function(err, useri) {

      if (err) {
        sendJSONResponse(res, 400, err);
      } 
      
      else {
        sendJSONResponse(res, 200, {
          "userId": useri._id,
          "numeIntreg": user.numeIntreg
        });
      }
    });
  });
};
