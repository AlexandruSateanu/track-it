var sendJSONResponse = require('../helpers/sendJSONResponse');

module.exports = function(req, res) {
  sendJSONResponse(res, 404, {
    "message": "Cerere gresita."
  });
};
