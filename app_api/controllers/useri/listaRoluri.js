var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');

var roluri = require('../../config/roluri');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    /* Trimite ca raspuns un array cu toate rolurile */
    if (roluri) {
      /* Nu putem trimite rolul de Project Manager, fiindca acesta e folosit
       doar la creare de proiect. */
      roluri = roluri.filter(rol => rol.rolId !== 0);

      sendJSONResponse(res, 200, {
        "listaRoluri": roluri
      });
    }

    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista roluri definite"
      });
    }
  });
};
