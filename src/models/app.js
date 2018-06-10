var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var App   = new Schema({
    diasSemAcidentes: Number,
});

module.exports = mongoose.model('App', App);