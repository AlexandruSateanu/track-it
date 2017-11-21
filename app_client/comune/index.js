var app = require('angular').module('track-it');

app.directive('subsol', require('./subsol/subsol.directive.js'));
app.directive('navigare', require('./navigare/navigare.directive.js'));

app.directive('activitatiRecente', require('./activitatiRecente/activitatiRecente.directive.js'));
app.directive('activitateaMea', require('./activitateaMea/activitateaMea.directive.js'));
