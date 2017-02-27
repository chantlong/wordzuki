const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
  username: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
},
{ timestamps: true });

const options = {
  errorMessages: {
    IncorrectUsernameError: 'メアドまたはパスワードが違います',
    IncorrectPasswordError: 'メアドまたはパスワードが違います',
  },
};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);
