var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var perioadaSchema = new mongoose.Schema({
  dataStart: {type: Date, required: true},
  dataSfarst: {type: Date, required: true}
});

var etapaSchema = new mongoose.Schema({
  numeEtapa: {type: String, required: true}
});

var membruSchema = new mongoose.Schema({
  membru: {type: Number, ref: 'User', required: true},
  rol: {type: Number, ref: 'Rol', required: true}
});

var proiectSchema = new mongoose.Schema({
  numeProiect: {type: String, required: true},
  cheieProiect: {type: String, required: true},
  tipProiect: {type: String, enum: ['1', '2'], required: true},
  managerProiect: {type: Number, ref: 'User', required: true},
  perioada: [perioadaSchema],
  etape: [etapaSchema],
  membri: [membruSchema]
});

proiectSchema.plugin(autoIncrement.plugin, 'Proiect');
mongoose.model('Proiect', proiectSchema);
