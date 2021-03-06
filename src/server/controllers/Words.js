const Word = require('../models/Word');
const objectid = require('objectid');
const Fuse = require('fuse.js');

module.exports = {
  fetchWords: (req, res) => {
    Word.find({ userId: req.user._id }).sort('-updatedAt').then((words) => {
      res
        .status(200)
        .send(words);
    });
  },
  saveWord: (req, res) => {
    const word = req.body.word;
    Word.findOne({ userId: req.user._id, word })
      .then((exists) => {
        if (!exists) {
          const lang = word.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/) ? 'ja' : 'en';
          const newWord = new Word({
            _id: objectid(),
            userId: req.user._id,
            word: req.body.word,
            def: req.body.definition,
            ex: req.body.example,
            source: req.body.source,
            sourceTitle: req.body.sourceTitle,
            lang,
            tags: req.body.tags,
          });
          newWord.save((err) => {
            if (err) {
              res.status(400).json({ ERROR: err });
            } else {
              res.status(200).json({ SUCCESS: newWord });
            }
          });
        }
      });
  },
  addWordDefinition: (req, res) => {
    Word.findOneAndUpdate({ _id: req.params.id }, { ex: req.body.ex, def: req.body.def, tags: req.body.tags }, { new: true })
      .then((word) => {
        res.status(200).json(word);
      })
      .catch(err => res.status(400).json({ message: err }));
  },
  deleteWord: (req, res) => {
    Word.findOneAndRemove({ _id: req.params.id })
      .then((info) => {
        res.status(200).json({ message: `${info.word}を削除しました。` });
      });
  },
  searchWords: (req, res) => {
    const searched = req.body.search;
    const words = req.body.words;
    const options = {
      shouldSort: true,
      tokenize: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        'word',
        'stem',
        'def',
        'ex',
        'author',
      ],
    };
    const fuse = new Fuse(words, options); // "list" is the item array
    const result = fuse.search(searched);
    res.send(result);
  },
};

// const Tesseract = require('tesseract.js');
// const fs = require('fs');
// const request = require('request');
// const parseString = require('xml2js').parseString;
// const http = require('http');
// const stemmer = require('porter-stemmer').stemmer;
// const lemmer = require('lemmer').lemmatize;

// searchWord: (req, res) => {
//   var term = req.body.word.trim();
//   if (term.length === 0) {
//     res.send({ ERROR: 'Please select a word' });
//   }
//   term = stemmer(term);
//   console.log('STEMMED WORD', term);
//   module.exports.parseXMLID(term)
//   .then(result => module.exports.parseXMLDef(result))
//   .then(result => res.json({ SUCCESS: result }))
//   .catch((err) => {
//     res.send({ ERROR: err });
//   });
// },

// parseXMLID: term => new Promise((resolve, reject) => {
//   http.get(`http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=${term}&Scope=HEADWORD&Match=STARTWITH&Merge=AND&&PageSize=5&PageIndex=0&Prof=XHTML`, (response) => {
//     var xml = '';
//     response.on('data', (chunk) => {
//       xml += chunk;
//     });
//     response.on('end', () => {
//       parseString(xml, (err, result) => {
//         if (err) {
//           reject(err);
//         }
//         if (result.SearchDicItemResult.TotalHitCount[0] === '0') {
//           return reject('No definition found');
//         }
//         const termID = result.SearchDicItemResult.TitleList[0].DicItemTitle[0].ItemID[0];
//         const termWord = result.SearchDicItemResult.TitleList[0].DicItemTitle[0].Title[0].span[0]._;
//         console.log('term worddddd', termWord);
//         return resolve(termID);
//       });
//     })
//     .on('error', (err) => {
//       reject(err);
//     });
//   });
// }),
// parseXMLDef: id => new Promise((resolve, reject) => {
//   http.get(`http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic=EJdict&Item=${id}&Loc=&Prof=XHTML`, (response) => {
//     var xml = '';
//     response.on('data', (chunk) => {
//       xml += chunk;
//     });
//     response.on('end', () => {
//       parseString(xml, (err, result) => {
//         if (err) {
//           reject(err);
//         }
//         const def = result.GetDicItemResult.Body[0].div[0].div[0].split('\t');
//         resolve(def);
//       });
//     })
//     .on('error', (err) => {
//       reject(err);
//     });
//   });
// }),

// readImage: (req, res) => {
//   console.log('the req.body i=mage', req.body.image)
//   var filename = 'pic.png'
//   const writeFile = fs.createWriteStream(filename)
//   request(req.body.image).pipe(writeFile).on('close', function() {
//     console.log(req.body.image, 'saved to', filename)
//     Tesseract.recognize(filename)
//       .progress((p) => { console.log('progress', p)  })
//       .catch(err => console.error(err))
//       .then((result) => {
//         console.log(result);
//         res.send(result);
//         process.exit(0)
//       })
//   });
// },
