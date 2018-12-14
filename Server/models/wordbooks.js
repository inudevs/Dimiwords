var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WordSchema = require('./words').schema;

var WordbookSchema = new Schema({
    name: String, // name of wordbook
    intro: String, // intro of wordbook
    words: [WordSchema] // list of words in wordbook
});

var Wordbook = mongoose.model('Wordbook', WordbookSchema);
module.exports = Wordbook;
