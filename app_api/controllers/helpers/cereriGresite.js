var sendJSONResponse = require('../helpers/sendJSONResponse');

module.exports = function(req, res) {
  sendJSONResponse(res, 400, {
    "message": "Cerere gresita."
  });
};
