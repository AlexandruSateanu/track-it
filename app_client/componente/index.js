var app = require('angular').module('track-it');

/* Home */
app.controller('homeCtrl', ['$location', 'autentificare', require('./home/home.controller.js')]);

/* Admin*/
app.controller('creareUserCtrl', ['autentificare', require('./admin/creareUser/creareUser.controller.js')]);

/* Altele */
app.controller('pagina403Ctrl', require('./altele/pagina403/pagina403.controller.js'));
app.controller('pagina404Ctrl', require('./altele/pagina404/pagina404.controller.js'));

/* Autentificare */
app.controller('registerCtrl', ['$location', 'autentificare', require('./autentificare/register/register.controller.js')]);
app.controller('confirmareCtrl', ['$location', 'autentificare', require('./autentificare/confirmare/confirmare.controller.js')]);

/* Start */
app.controller('panouStartCtrl', require('./panouStart/panouStart.controller.js'));

/* Proiect */
app.controller('proiectStartCtrl', ['$rootScope', require('./proiect/proiectStart/proiectStart.controller.js')]);
app.controller('creareProiectCtrl', ['proiect', '$rootScope', '$location', require('./proiect/creareProiect/creareProiect.controller.js')]);
app.controller('alegeEtapeCtrl', ['proiect', '$location', '$routeParams', '$rootScope', require('./proiect/alegeEtape/alegeEtape.controller.js')]);
app.controller('alegeMembriCtrl', ['proiect', '$routeParams', 'useri', 'autentificare', '$rootScope', '$location', require('./proiect/alegeMembri/alegeMembri.controller.js')]);
app.controller('setariProiectCtrl', require('./proiect/setariProiect/setariProiect.controller.js'));
app.controller('editeazaPerioadaCtrl', ['$scope', require('./proiect/setariProiect/editeazaPerioada.controller.js')]);
app.controller('editeazaEtapeCtrl', ['$scope', require('./proiect/setariProiect/editeazaEtape.controller.js')]);
app.controller('editeazaMembriCtrl', ['$scope', require('./proiect/setariProiect/editeazaMembri.controller.js')]);

/* Activitate */
app.controller('creareActivitateCtrl', ['$location', require('./activitate/creareActivitate/creareActivitate.controller.js')]);
app.controller('paginaActivitateCtrl', require('./activitate/paginaActivitate/paginaActivitate.controller.js'));

/* Sarcina */
app.controller('creareSarcinaCtrl', ['$location', require('./sarcina/creareSarcina/creareSarcina.controller.js')]);
