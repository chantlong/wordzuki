const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  userId: String,
  word: String,
  pron: String,
  examples: [String],
  source: String,
},
{ timestamps: true });

const Word = mongoose.model('Word', WordSchema);

module.exports = Word;

