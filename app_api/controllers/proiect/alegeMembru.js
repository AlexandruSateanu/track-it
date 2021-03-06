var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUserProiect = require('../helpers/existaUserProiect');

var nodemailer = require('nodemailer');

module.exports = function(req, res) {
  var proiectId = req.params.proiectId;

  /* executa callback daca exista user logat si daca face parte din proiect. */
  existaUserProiect(req, res, proiectId, function (req, res, user) {
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId) {
      
      /* Selecteaza proiectul dupa id */
      Proiect
        .findById(proiectId)
        .exec(function(err, proiect) {
          
          /* verifica daca proiectul cu id-ul dat exista */
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit"
            });
  
            return
          } 
          
          else if (err) {
            sendJSONResponse(res, 404, err);
  
            return;
          }
          
          /* Extrage membrul din body-ul POST */
          var membruNou = {
            membru: req.body.membru.userId,
            rol: req.body.rol
          };

          /* Verifica daca membrul este deja in proiect */
          var verificareMembruExistent = proiect.membri.filter(membru => membru.membru === membruNou.membru);
          
          if (verificareMembruExistent.length === 0) {
            /* Adauga membru la array-ul cu membri din modelul de proiect. */
            proiect.membri.push(membruNou);
  
            /* Salveaza noul proiect cu noii membri */
            proiect.save(function(err, proiect) {
              if (err) {
                sendJSONResponse(res, 400, err);
              } 
              
              else {
                User.findByIdAndUpdate(
                  membruNou.membru,
                  { $push: { 'proiecte' : { proiect: proiect._id, rol: membruNou.rol } } },
                  { safe: true, new: true },
                  function(err, user) {
                    
                    if (err) {
                      sendJSONResponse(res, 400, err);

                      return;
                    } 
                    
                    else {
                      /* Daca membrul a fost adaugat cu succes, trimitem raspuns catre client 
                      si email de notificare catre membru. */
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
                        subject: 'Track It - Notificare proiect nou', 
                        text: 'Buna, ' + user.numeIntreg + '\n\n' + 'Va anuntam ca acum faceti parte din echipa proiectului ' + proiect.numeProiect + '.\n\n' + 'Puteti accesa pagina de start a proiectului aici: ' + 'http:\/\/' + req.headers.host + '\/proiect\/' + proiect._id + '.\n' 
                      };
  
                      transporter.sendMail(mailOptions, function(err) {
                        if (err) {
                          sendJSONResponse(res, 500, {
                            "message": err.message
                          });
                          
                          return;
                        }
                      });
  
                      sendJSONResponse(res, 200, {
                        "message": "Noul membru fost salvat.",
                        "membri": proiect.membri
                      });
                    }
                  }
                );
              }
            });
          }

          else {
            sendJSONResponse(res, 400, {
              "message": "Userul face parte deja din proiect."
            });

            return;
          }
        });
    } 
    
    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de proiect in request."
      });

      return;
    }
  });
};
