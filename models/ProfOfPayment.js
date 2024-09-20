const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // other fields as necessary
});

userSchema.plugin(passportLocalMongoose);

const Usermodel = mongoose.model('User', userSchema);
module.exports = Usermodel;
