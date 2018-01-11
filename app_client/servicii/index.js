var app = require('angular').module('track-it');

/* Activitate */
app.service('activitate', ['$http', 'autentificare', require('./activitate/activitate.service.js')]);

/* Autentificare */
app.service('autentificare', ['$window', '$http',  require('./autentificare/autentificare.service.js')]);

/* Proiect */
app.service('proiect', ['$http', 'autentificare', require('./proiect/proiect.service.js')]);
app.factory('creareProiectActiva', require('./proiect/creareProiectActiva.factory.js'));

/* Useri */
app.service('useri', ['$http', 'autentificare', require('./useri/useri.service.js')]);
