const Word = require('../models/Word');
const loadE2JDict = require('./Dict').loadE2JDict;
const searchE2J = require('./Dict').searchE2J;
const objectid = require('objectid');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

module.exports = {
  // fetch Kindle Vocabulary Builder Data
  readKVB: (req, res) => {
    const file = path.resolve(`./src/server/uploads/${req.file.filename}`);
    const db = new sqlite3.Database(file);
    db.serialize(() => {
      db.all('SELECT l.usage, w.word, w.stem, w.lang, b.title, b.authors from LOOKUPS l INNER JOIN WORDS w ON l.word_key = w.id INNER JOIN BOOK_INFO b ON l.book_key = b.id', (err, data) => {
        if (err) {
          fs.unlink(file, (err) => {
            if (err) {
              console.log('delete err', err);
            }
            res.json({ ERROR: 'このファイルは導入できませんでした。' });
          });
        }
        module.exports.saveKVB(req, res, data)
          .then(count => {
            console.log('the count', count);
            fs.unlink(file, (err) => {
              if (err) {
                console.log('delete err', err);
              }
              res.json({ SUCCESS: count });
            });
          });
      });
    });
    db.close();
  },
  saveKVB: (req, res, data) => {
    return new Promise((resolve, reject) => {
      const KVBdata = data;
      const total = KVBdata.length - 1;
      let count = 0;
      let insertCount = 0;
      loadE2JDict()
        .then((dictData) => {
          const dict = dictData;
          console.log('loaded that dict');
          for (let i = 0; i < KVBdata.length; i += 1) {
            ((pos) => {
              count += 1;
              const item = KVBdata[pos];
              Word.findOne({ userId: req.user._id, word: item.word })
                .then((match) => {
                  if (!match) {
                    if (item.lang === 'en' || item.lang === 'en-GB') {
                      const stem = item.title !== item.stem ? item.stem : null;
                      const def = searchE2J(stem, dict);
                      const newWord = new Word({
                        _id: objectid(),
                        userId: req.user._id,
                        word: item.word,
                        stem,
                        def,
                        ex: item.usage.trim(),
                        author: `${item.title} - ${item.authors}`,
                      });
                      newWord.save((err) => {
                        if (err) {
                          console.log('the err', err);
                        } else {
                          // res.json({ SUCCESS: newWord });
                        }
                      });
                      insertCount += 1;
                    }
                  }
                })
                .then(() => {
                  if (count > total) {
                    console.log('got in here');
                    resolve(`単語${insertCount}個を導入しました。`);
                  }
                });
            })(i);
          }
        });
    });
  },
};
