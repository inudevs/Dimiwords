var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
    en: String, // English word
    ko: [String], // Korean translations
    user_id: String // _id of user who created word
});
WordSchema.plugin(mongoosePaginate);

var Word = mongoose.model('Word', WordSchema);
module.exports = Word;
