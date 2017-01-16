const async = require('async');

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
          fs.unlink(file, (err2) => {
            if (err2) {
              throw err2;
            }
            res.json({ ERROR: 'このファイルは導入できませんでした。' });
          });
        }
        module.exports.saveKVB(req, res, data)
          .then((count) => {
            fs.unlink(file, (err3) => {
              if (err3) {
                throw err3;
              }
              res.json({ SUCCESS: count });
            });
          });
      });
    });
    db.close();
  },
  saveKVB: (req, res, data) => (new Promise((resolve) => {
    const KVBdata = data;
    const total = KVBdata.length - 1;
    let count = 0;
    let insertCount = 0;
    const checkCount = () => {
      count += 1;
      if (count > total) {
        resolve(`単語${insertCount}個を導入しました。`);
      }
    }
    loadE2JDict()
      .then((dictData) => {
        const dict = dictData;
        for (let i = 0; i < KVBdata.length; i += 1) {
          ((pos) => {
            const item = KVBdata[pos];
            Word.findOne({ userId: req.user._id, word: item.word })
              .then((match) => {
                if (!match) {
                  if (item.lang === 'en' || item.lang === 'en-GB') {
                    const stem = item.title !== item.stem ? item.stem : null;
                    const def = searchE2J(stem, dict);
                    const authors = item.authors.split(';').map(el => el.split(',')).map(el2 => el2.join(' ')).join(', ');
                    const newWord = new Word({
                      _id: objectid(),
                      userId: req.user._id,
                      word: item.word,
                      stem,
                      def,
                      ex: item.usage.trim(),
                      author: `${item.title} - ${authors}`,
                    });
                    newWord.save((err) => {
                      if (!err) {
                        insertCount += 1;
                        checkCount();
                      }
                    });
                  } else {
                    checkCount();
                  }
                } else {
                  checkCount();
                }
              });
          })(i);
        }
      });
  })),
};

// saveKVB: (req, res, data) => (new Promise((resolve) => {
//   const KVBdata = data;
//   let insertCount = 0;
//   let dict;
//
//   const checkIfExist = (item, cb) => {
//     Word.count({ userId: req.user._id, word: item.word })
//       .then((count) => {
//         if (!count) {
//           insertCount++;
//         }
//         cb(null, !count);
//       });
//   };
//   loadE2JDict()
//     .then((dictData) => {
//       dict = dictData;
//       return new Promise((resolve2) => {
//         async.filter(
//           KVBdata,
//           checkIfExist,
//           (err, result) => {
//             resolve2(result);
//           });
//       });
//     });
// })),
