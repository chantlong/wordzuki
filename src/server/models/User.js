const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
  username: String,
  password: String,
});

const options = {
  errorMessages: {
    IncorrectPasswordError: 'メアドまたはパスワードが違います',
  },
};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);
