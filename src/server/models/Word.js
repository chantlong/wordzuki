const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  userId: String,
  word: String,
  stem: String,
  def: [String],
  pron: String,
  ex: String,
  source: String,
  lang: String,
  author: String,
},
{ timestamps: true });

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;
