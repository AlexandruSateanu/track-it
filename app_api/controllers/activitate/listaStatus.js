var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

var status = require('../../config/status');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    /* Trimite ca raspuns un array cu toate statusurile */
    if (status) {
      sendJSONResponse(res, 200, {
        "listaStatus": status
      });
    }

    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista statusuri definite"
      });
    }
  });
};
