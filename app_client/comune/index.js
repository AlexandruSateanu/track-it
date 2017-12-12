var app = require('angular').module('track-it');

/* Layout */
app.directive('subsol', require('./layout/subsol/subsol.directive.js'));
app.directive('navigare', require('./layout/navigare/navigare.directive.js'));
app.controller('navigareCtrl', ['$location', 'autentificare', require('./layout/navigare/navigare.controller.js')]);
app.directive('antetPagina', require('./layout/antetPagina/antetPagina.directive.js'));

/* Date Picker */
app.controller('datePickerCtrl', require('./datePicker/datePicker.controller.js'));
app.directive('datePicker', require('./datePicker/datePicker.directive.js'));
app.controller('datePickerCustomCtrl', require('./datePickerCustom/datePickerCustom.controller.js'));
app.directive('datePickerCustom', require('./datePickerCustom/datePickerCustom.directive.js'));

app.directive('tabelRecente', require('./tabelRecente/tabelRecente.directive.js'));
app.directive('proiecteleMele', require('./proiecteleMele/proiecteleMele.directive.js'));
app.directive('tabelStatistici', require('./tabelStatistici/tabelStatistici.directive.js'));
app.directive('tabelMembri', require('./tabelMembri/tabelMembri.directive.js'));
app.directive('antetActivitate', require('./antetActivitate/antetActivitate.directive.js'));
