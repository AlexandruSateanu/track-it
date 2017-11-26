var app = require('angular').module('track-it');

app.controller('homeCtrl', require('./home/home.controller.js'));
app.controller('panouStartCtrl', require('./panouStart/panouStart.controller.js'));
app.controller('proiectStartCtrl', require('./proiectStart/proiectStart.controller.js'));
app.controller('creareProiectCtrl', require('./creareProiect/creareProiect.controller.js'));
app.controller('setariProiectCtrl', require('./setariProiect/setariProiect.controller.js'));
