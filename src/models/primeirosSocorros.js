var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Sintomas = new Schema({
    descricao: String
});

var Reagir = new Schema({
    descricao: String
});

var PrimeirosSocorrosSchema   = new Schema({
    titulo  : String,
    sintomas: [Sintomas],
    reagir  : [Reagir],
    date    : { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrimeirosSocorros', PrimeirosSocorrosSchema);