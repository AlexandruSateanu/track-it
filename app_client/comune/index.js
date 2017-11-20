var app = require('angular').module('track-it');

app.directive('subsol', require('./subsol/subsol.directive.js'));
app.directive('navigare', require('./navigare/navigare.directive.js'));

app.directive('proiecteRecente', require('./proiecteRecente/proiecteRecente.directive.js'));
