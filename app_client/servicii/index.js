var app = require('angular').module('track-it');

/* Autentificare */
app.service('autentificare', ['$window', '$http', require('./autentificare/autentificare.service.js')]);

/* Proiect */
app.service('proiect', ['$http', 'autentificare', require('./proiect/proiect.service.js')]);
