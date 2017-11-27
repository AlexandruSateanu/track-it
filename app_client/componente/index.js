var app = require('angular').module('track-it');

app.controller('homeCtrl', require('./home/home.controller.js'));
app.controller('panouStartCtrl', require('./panouStart/panouStart.controller.js'));

/* Proiect */
app.controller('proiectStartCtrl', require('./proiect/proiectStart/proiectStart.controller.js'));
app.controller('creareProiectCtrl', require('./proiect/creareProiect/creareProiect.controller.js'));
app.controller('setariInitialeCtrl', require('./proiect/setariInitiale/setariInitiale.controller.js'));
