var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var roluri = [
  'Manager Proiect',
  'Coordonator echipa',
  'Membru echipa',
  'Consultant',
  'Vizitator'
];

var rolSchema = new mongoose.Schema({
  rol: {type: String, enum: roluri, required: true}
});

rolSchema.plugin(autoIncrement.plugin, 'Rol');
mongoose.model('Rol', rolSchema);
