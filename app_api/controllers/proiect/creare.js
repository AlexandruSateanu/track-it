var mongoose = require('mongoose');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = function(req, res) {
  Proiect.create({
    numeProiect: req.body.numeProiect,
    cheieProiect: req.body.cheieProiect,
    tipProiect: req.body.tipProiect,
    managerProiect: req.body.managerProiect
  }, function(err, proiect) {
    if (err) {
      sendJSONResponse(res, 400, err);
    } else {
      sendJSONResponse(res, 201, proiect);
    }
  });
};
