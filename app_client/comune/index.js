var app = require('angular').module('track-it');

/* Layout */
app.directive('subsol', require('./layout/subsol/subsol.directive.js'));
app.directive('navigare', require('./layout/navigare/navigare.directive.js'));
app.directive('antetPagina', require('./layout/antetPagina/antetPagina.directive.js'));

app.directive('tabelRecente', require('./tabelRecente/tabelRecente.directive.js'));
app.directive('proiecteleMele', require('./proiecteleMele/proiecteleMele.directive.js'));
app.directive('tabelStatistici', require('./tabelStatistici/tabelStatistici.directive.js'));
