
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    id: Number,
    name: String
});

module.exports = mongoose.model('User', BearSchema);