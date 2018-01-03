var mongoose = require('mongoose');
var User = mongoose.model('User');
var Proiect = mongoose.model('Proiect');

var sendJSONResponse = require('../helpers/sendJSONResponse');
var existaUser = require('../helpers/existaUser');
var roluri = require('../../config/roluri');

var nodemailer = require('nodemailer');

module.exports = function(req, res) {
  /* executa callback daca exista user logat */
  existaUser(req, res, function (req, res, user) {
    var proiectId = req.params.proiectId;
    var membruId = req.body.membruId;
    
    /* verifica daca avem parametru cu id-ul de proiect in URL */
    if (proiectId && membruId) {
      
      /* Selecteaza proiectul dupa id */
      Proiect
        .findById(proiectId)
        .select('membri')
        .exec(function(err, proiect) {
          
          /* verifica daca proiectul cu id-ul dat exista */
          if (!proiect) {
            sendJSONResponse(res, 404, {
              "message": "Proiectul nu a fost gasit!"
            });
  
            return
          }
          
          else if (err) {
            sendJSONResponse(res, 404, err);
  
            return;
          }
          
          /* Extrage membrul care trebuie editat. */
          var membru = proiect.membri.id(membruId);

          /* Verifica existenta membrului si editeaza rolul. */
          if(!membru) {
            sendJSONResponse(res, 404, {
              "message": "Membrul nu exista!"
            });
          }

          else {
            membru.rol = req.body.rol;

            /* Salveaza proiectul cu noul rol al membrului */
            proiect.save(function(err, proiect) {
              if (err) {
                sendJSONResponse(res, 400, err);
              } 
              
              else {
                User.findOneAndUpdate(
                  { "_id": membru.membru, "proiecte.proiect": proiectId },
                  { $set: { 'proiecte.$.rol': membru.rol } },
                  { safe: true, new: true },
                  function(err, user) {
                    
                    if (err) {
                      sendJSONResponse(res, 400, err);
                    } 
                    
                    else {
                      /* Daca membrul a fost editat cu succes, trimitem raspuns catre client 
                      si email de notificare catre membru. */
                      var transporter = nodemailer.createTransport({
                        service: 'SendGrid',
                        auth: { 
                          user: process.env.SENDGRID_USERNAME, 
                          pass: process.env.SENDGRID_PASSWORD 
                        } 
                      });

                      var rolNou = roluri.filter(rol => rol.rolId === membru.rol);
                      var numeRol = rolNou[0].rol;
  
                      var mailOptions = {
                        from: 'no-reply@track-it.com', 
                        to: user.email, 
                        subject: 'Track It - Notificare proiect nou', 
                        text: 'Buna, ' + user.numeIntreg + '\n\n' + 'Va anuntam ca acum rolul vostru din echipa proiectului ' + proiect.numeProiect + ' este acum cel de ' + numeRol + '.\n\n' + 'Puteti accesa pagina de start a proiectului aici: ' + 'http:\/\/' + req.headers.host + '\/proiect\/' + proiect._id + '.\n' 
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
                        "message": "Noul rol al membrului fost salvat.",
                        "membru": membru
                      });
                    }
                  }
                );
              }
            });
          }
        });
    } 
    
    else {
      sendJSONResponse(res, 404, {
        "message": "Nu exista id de proiect si de membru in request."
      });
    }
  });
};
