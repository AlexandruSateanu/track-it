var app = require('angular').module('track-it');

/* Layout */
app.directive('subsol', require('./layout/subsol/subsol.directive.js'));
app.directive('navigare', require('./layout/navigare/navigare.directive.js'));
app.directive('antetPagina', require('./layout/antetPagina/antetPagina.directive.js'));

app.directive('activitatiRecente', require('./activitatiRecente/activitatiRecente.directive.js'));
app.directive('activitateaMea', require('./activitateaMea/activitateaMea.directive.js'));
app.directive('proiecteleMele', require('./proiecteleMele/proiecteleMele.directive.js'));
app.directive('tabelStatistici', require('./tabelStatistici/tabelStatistici.directive.js'));
