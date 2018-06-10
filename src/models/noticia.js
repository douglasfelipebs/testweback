var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NoticiaSchema   = new Schema({
    imgUrl      : String,
    imgDescricao: String,
    titulo      : String,
    corpoTexto  : String,
    favorito    : Boolean,
    date        : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Noticia', NoticiaSchema);