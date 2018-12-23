var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var WordSchema = require('./words').schema;

var WordbookSchema = new Schema({
    name: String, // name of wordbook
    intro: String, // intro of wordbook
    words: [WordSchema], // list of words in wordbook
    user_id: String // _id of user who created wordbook
});
WordbookSchema.plugin(mongoosePaginate);

var Wordbook = mongoose.model('Wordbook', WordbookSchema);
module.exports = Wordbook;
