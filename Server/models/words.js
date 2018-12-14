var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
    en: String, // English word
    ko: [String] // Korean translations
});

var Word = mongoose.model('Word', WordSchema);
module.exports = Word;
