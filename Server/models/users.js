var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    intro: String, // intro
    email: { type : String , unique : true, required : true, dropDups: true }, // email (used as id)
    password: { type : String , required : true },
    department: Number, // { 'eb': 0, 'dc': 1, 'wp': 2, 'hd': 3 }
    points: Number,
    profile: String, // profile picture URL
});
UserSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', UserSchema);
module.exports = User;
