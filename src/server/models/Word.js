const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  userId: String,
  word: String,
  stem: String,
  def: [String],
  pron: String,
  ex: String,
  source: String,
  sourceTitle: String,
  lang: String,
  author: String,
  tags: [String],
},
{ timestamps: true });

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;
