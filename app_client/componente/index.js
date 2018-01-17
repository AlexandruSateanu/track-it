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
app.controller('panouStartCtrl', ['autentificare', 'useri', require('./panouStart/panouStart.controller.js')]);

/* Proiect */
app.controller('proiectStartCtrl', ['$scope', 'creareProiectActiva', '$routeParams', 'proiect', 'activitate', require('./proiect/proiectStart/proiectStart.controller.js')]);
app.controller('creareProiectCtrl', ['proiect', '$location', '$scope', 'creareProiectActiva', require('./proiect/creareProiect/creareProiect.controller.js')]);
app.controller('alegeEtapeCtrl', ['proiect', '$location', '$routeParams', '$rootScope', '$scope', 'creareProiectActiva', require('./proiect/alegeEtape/alegeEtape.controller.js')]);
app.controller('alegeMembriCtrl', ['proiect', '$routeParams', 'useri', 'autentificare', '$location', '$rootScope', '$scope', 'creareProiectActiva', require('./proiect/alegeMembri/alegeMembri.controller.js')]);
app.controller('setariProiectCtrl', ['proiect', '$routeParams', require('./proiect/setariProiect/setariProiect.controller.js')]);
app.controller('editeazaPerioadaCtrl', ['proiect', '$routeParams', '$window', require('./proiect/setariProiect/editeazaPerioada.controller.js')]);
app.controller('editeazaEtapeCtrl', ['proiect', '$routeParams', require('./proiect/setariProiect/editeazaEtape.controller.js')]);
app.controller('editeazaMembriCtrl', ['proiect', '$routeParams', 'useri', 'autentificare', require('./proiect/setariProiect/editeazaMembri.controller.js')]);

/* Activitate */
app.controller('creareActivitateCtrl', ['$routeParams', 'proiect', 'activitate', 'useri', '$location', require('./activitate/creareActivitate/creareActivitate.controller.js')]);
app.controller('paginaActivitateCtrl', ['$routeParams', 'proiect', 'activitate', '$location', 'autentificare', require('./activitate/paginaActivitate/paginaActivitate.controller.js')]);
app.controller('editeazaActivitateCtrl', ['$routeParams', 'proiect', 'activitate', 'useri', require('./activitate/editeazaActivitate/editeazaActivitate.controller.js')]);

/* Sarcina */
app.controller('creareSarcinaCtrl', ['$location', require('./sarcina/creareSarcina/creareSarcina.controller.js')]);
