var mongoose = require('mongoose');
var Activitate = mongoose.model('Activitate');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    
    
  });
};
