var mongoose = require('mongoose');

var User = mongoose.model('User');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = function(req, res) {
  /* Validam datele din cerere. */
  if(!req.body.email || !req.body.numeIntreg || !req.body.parola || !req.body.parolaConfirmare) {
    sendJSONResponse(res, 400, {
      "message": "Toate campurile sunt obligatorii."
    });
  
    return;
  } else if (req.body.parola !== req.body.parolaConfirmare) {
    sendJSONResponse(res, 400, {
      "message": "Parolele nu sunt identice."
    });

    return;
  }

  /* Verificam in baza de date daca emailul exista deja. */
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      sendJSONResponse(res, 400, {
        "message": "Adresa de email exista deja pentru un alt utilizator."
      });
  
      return;
    }

    /* Daca nu exista, creem unul noua in baza de date. */
    user = new User();

    user.numeIntreg = req.body.numeIntreg;
    user.email = req.body.email;
    user.setPassword(req.body.parola);

    /* Marcheaza userul ca verificat. */
    user.isVerified = true;

    user.save(function (err) {
      if (err) {
        sendJSONResponse(res, 500, {
          'message': err.message
        });

        return;
      }

      sendJSONResponse(res, 200, {
        'message': 'Contul a fost creat.'
      });
    });
  });
};
