var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var getUser = require('../helpers/getUser');

module.exports = function(req, res) {
  getUser(req, res, function (req, res, user) {
    Proiect.create({
      numeProiect: req.body.numeProiect,
      cheieProiect: req.body.cheieProiect,
      tipProiect: req.body.tipProiect,
      managerProiect: user._id
    }, function(err, proiect) {
      if (err) {
        sendJSONResponse(res, 400, err);
      } else {
        sendJSONResponse(res, 201, proiect);

        /* Salveaza proiectul si in user */
        User.update({ _id : user._id }, { $push: { proiecte : proiect._id } });
      }
    });
  });
};
