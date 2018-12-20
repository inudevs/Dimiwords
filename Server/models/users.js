var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type : String , unique : true, required : true, dropDups: true }, // username
    intro: String, // intro
    password: { type : String , required : true },
    points: Number,
    profile: String // profile picture URL
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
