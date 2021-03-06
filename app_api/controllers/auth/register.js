var mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var User = mongoose.model('User');
var Verify = mongoose.model('Verify');

var sendJSONResponse = require('../helpers/sendJSONResponse');

module.exports = function(req, res) {
  /* Validam datele din cerere. */
  if(!req.body.email || !req.body.numeIntreg || !req.body.parola || !req.body.parolaConfirmare) {
    sendJSONResponse(res, 400, {
      "message": "Toate campurile sunt obligatorii."
    });

    return;
  } 
  
  else if (req.body.parola !== req.body.parolaConfirmare) {
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

    user.save(function (err) {
      if (err) {
        sendJSONResponse(res, 500, {
          "message": err.message
        });

        return;
      }

      /* Creem token nou de verificare. */
      var verifyToken = new Verify({ 
        _userId: user._id, 
        token: crypto.randomBytes(16).toString('hex') 
      });

      verifyToken.save(function (err) {
        if (err) {
          sendJSONResponse(res, 500, {
            "message": err.message
          });

          return;
        }

        /* Trimitem email cu tokenul de verificare. */
        var transporter = nodemailer.createTransport({
          service: 'SendGrid',
          auth: { 
            user: process.env.SENDGRID_USERNAME, 
            pass: process.env.SENDGRID_PASSWORD 
          } 
        });

        var mailOptions = { 
          from: 'no-reply@track-it.com', 
          to: user.email, 
          subject: 'Verificare cont nou', 
          text: 'Buna,\n\n' + 'Te rugam sa verifici contul nou, navigand la acest link: \nhttp:\/\/' + req.headers.host + '\/confirmare?token=' + verifyToken.token + '.\n' 
        };
        
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            sendJSONResponse(res, 500, {
              "message": err.message
            });
            
            return;
          }

          sendJSONResponse(res, 200, {
            "message": "Un email de verificare a fost trimis catre " + user.email
          });
        });
      });
    });
  });
};
