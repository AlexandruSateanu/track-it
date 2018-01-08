var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var status = require('../config/status');

var proiectSchema = new mongoose.Schema({
  proiectId: {type: Number, ref: 'Proiect', required: true},
  etapa: {type: ObjectId, ref: 'Proiect.etape'}
});

var comentariuSchema = new mongoose.Schema({
  membru: {type: Number, ref: 'User', required: true},
  text: String
}, {
  timestamps: true
});

var activitateSchema = new mongoose.Schema({
  numeActivitate: {type: String, required: true},
  responsabil: {type: Number, ref: 'User', required: true},
  proiect: {type: Number, ref: 'Proiect', required: true},
  status: {type: Number, min: 0, max: status.length, required: true},
  dataStartEstimata: {type: Date, required: true},
  dataSfarsitEstimata: {type: Date, required: true},
  dataStartRealizata: Date,
  dataSfarsitRealizata: Date,
  descriere: String,
  comentarii: [comentariuSchema]
}, {
  usePushEach: true,
  timestamps: true
});

activitateSchema.plugin(autoIncrement.plugin, {model: 'Activitate', startAt: 1});
mongoose.model('Activitate', activitateSchema);
