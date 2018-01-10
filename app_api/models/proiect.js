var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var roluri = require('../config/roluri');

var etapaSchema = new mongoose.Schema({
  numeEtapa: {type: String, required: true},
  dataStart: {type: Date, required: true},
  dataSfarsit: {type: Date, required: true}
});

var membruSchema = new mongoose.Schema({
  membru: {type: Number, ref: 'User', required: true},
  rol: {type: Number, min: 0, max: roluri.length, required: true}
});

var activitateSchema = new mongoose.Schema({
  activitateId: {type: Number, ref: 'Activitate', required: true},
  cod: String
});

var proiectSchema = new mongoose.Schema({
  numeProiect: {type: String, required: true},
  cheieProiect: {type: String, required: true, trim: true, uppercase: true, maxlength: 3},
  tipProiect: {type: String, enum: ['1', '2'], required: true},
  managerProiect: {type: Number, ref: 'User', required: true},
  dataStart: {type: Date, required: true},
  dataSfarsit: {type: Date, required: true},
  etape: [etapaSchema],
  membri: [membruSchema],
  activitati: [activitateSchema]
}, {
  usePushEach: true
});

proiectSchema.plugin(autoIncrement.plugin, {model: 'Proiect', startAt: 1});
mongoose.model('Proiect', proiectSchema);
