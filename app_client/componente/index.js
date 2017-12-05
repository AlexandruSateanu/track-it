var app = require('angular').module('track-it');

app.controller('homeCtrl', require('./home/home.controller.js'));
app.controller('panouStartCtrl', require('./panouStart/panouStart.controller.js'));

/* Proiect */
app.controller('proiectStartCtrl', require('./proiect/proiectStart/proiectStart.controller.js'));
app.controller('creareProiectCtrl', require('./proiect/creareProiect/creareProiect.controller.js'));
app.controller('alegePerioadaCtrl', require('./proiect/alegePerioada/alegePerioada.controller.js'));
app.controller('alegeEtapeCtrl', require('./proiect/alegeEtape/alegeEtape.controller.js'));
app.controller('alegeMembriCtrl', require('./proiect/alegeMembri/alegeMembri.controller.js'));
app.controller('setariProiectCtrl', require('./proiect/setariProiect/setariProiect.controller.js'));
app.controller('editeazaPerioadaCtrl', ['$scope', require('./proiect/setariProiect/editeazaPerioada.controller.js')]);
app.controller('editeazaEtapeCtrl', ['$scope', require('./proiect/setariProiect/editeazaEtape.controller.js')]);
app.controller('editeazaMembriCtrl', ['$scope', require('./proiect/setariProiect/editeazaMembri.controller.js')]);

/* Activitate */
app.controller('creareActivitateCtrl', ['$location', require('./activitate/creareActivitate/creareActivitate.controller.js')]);
