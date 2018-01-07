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
        sendJSONResponse(res, 404, err);

        return;
      }

      /* salvaza intr-un nou array doar id-ul si numele user-ului. 
      (Nu vrem sa trimitem toate datele, gen email) */
      var listaUseri = [];
      
      useri.forEach(user => {
        listaUseri.push({
          userId: user._id,
          numeIntreg: user.numeIntreg
        });
      });
      
      sendJSONResponse(res, 200, {
        "listaUseri": listaUseri
      });
    });
  });
};
