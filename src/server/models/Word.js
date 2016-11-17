const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  userId: String,
  word: String,
  def: Array,
  pron: String,
  ex: String,
  source: String,
},
{ timestamps: true });

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;

