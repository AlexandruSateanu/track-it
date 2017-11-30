var app = require('angular').module('track-it');

app.controller('homeCtrl', require('./home/home.controller.js'));
app.controller('panouStartCtrl', require('./panouStart/panouStart.controller.js'));

/* Proiect */
app.controller('proiectStartCtrl', require('./proiect/proiectStart/proiectStart.controller.js'));
app.controller('creareProiectCtrl', require('./proiect/creareProiect/creareProiect.controller.js'));
app.controller('alegePerioadaCtrl', require('./proiect/alegePerioada/alegePerioada.controller.js'));
app.controller('alegeMembriCtrl', require('./proiect/alegeMembri/alegeMembri.controller.js'));
