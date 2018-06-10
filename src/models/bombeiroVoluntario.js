var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BombeiroVoluntarioSchema   = new Schema({
    name    : String,
    email   : String,
    telefone: String,
    endereco: String,
    nadador : Boolean,
    date    : { type: Date, default: Date.now }
});

module.exports = mongoose.model('BombeiroVoluntario', BombeiroVoluntarioSchema);