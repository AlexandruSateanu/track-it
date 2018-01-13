var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var status = require('../config/status');

var comentariuSchema = new mongoose.Schema({
  membru: {type: Number, ref: 'User', required: true},
  text: String
}, {
  timestamps: true
});

var activitateSchema = new mongoose.Schema({
  numeActivitate: {type: String, required: true},
  responsabil: {type: Number, ref: 'User', required: true},
  proiectId: {type: Number, ref: 'Proiect', required: true},
  etapaId: {type: mongoose.Schema.Types.ObjectId, ref: 'Proiect.etape'},
  status: {type: Number, min: 0, max: status.length - 1, required: true},
  estimare: {type: Number, required: true},
  dataStart: {type: Date, default: Date.now},
  dataFinalizare: {type: Date, default: Date.now},
  descriere: String,
  comentarii: [comentariuSchema]
}, {
  usePushEach: true,
  timestamps: true
});

activitateSchema.plugin(autoIncrement.plugin, {model: 'Activitate', startAt: 1});
mongoose.model('Activitate', activitateSchema);
