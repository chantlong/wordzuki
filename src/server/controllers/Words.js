// const Tesseract = require('tesseract.js');
// const fs = require('fs');
// const request = require('request');
const Word = require('../models/Word');
const objectid = require('objectid');
const parseString = require('xml2js').parseString;
const http = require('http');
const stemmer = require('porter-stemmer').stemmer;
// const lemmer = require('lemmer').lemmatize;

module.exports = {
  fetchWords: (req, res) => {
    Word.find({ userId: req.user._id }).sort('-updatedAt').then((words) => {
      res
        .status(200)
        .send(words);
    });
  },
  saveWord: (req, res) => {
    const newWord = new Word({
      _id: objectid(),
      userId: req.user._id,
      word: req.body.word,
      def: req.body.definition,
      ex: req.body.example,
      source: req.body.source,
    });
    console.log('some save WORD====', req.body.def);
    newWord.save((err) => {
      if (err) {
        res.json({ ERROR: err });
      } else {
        res.json({ SUCCESS: newWord });
      }
    });
  },
  searchWord: (req, res) => {
    var term = req.body.word.trim();
    if (term.length === 0) {
      res.send({ ERROR: 'Please select a word' });
    }
    term = stemmer(term);
    console.log('STEMMED WORD', term);
    module.exports.parseXMLID(term)
    .then(result => module.exports.parseXMLDef(result))
    .then(result => res.json({ SUCCESS: result }))
    .catch((err) => {
      res.send({ ERROR: err });
    });
  },
  parseXMLID: term => new Promise((resolve, reject) => {
    http.get(`http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=${term}&Scope=HEADWORD&Match=STARTWITH&Merge=AND&&PageSize=5&PageIndex=0&Prof=XHTML`, (response) => {
      var xml = '';
      response.on('data', (chunk) => {
        xml += chunk;
      });
      response.on('end', () => {
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          }
          if (result.SearchDicItemResult.TotalHitCount[0] === '0') {
            return reject('No definition found');
          }
          const termID = result.SearchDicItemResult.TitleList[0].DicItemTitle[0].ItemID[0];
          const termWord = result.SearchDicItemResult.TitleList[0].DicItemTitle[0].Title[0].span[0]._;
          console.log('term worddddd', termWord);
          return resolve(termID);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  }),
  parseXMLDef: id => new Promise((resolve, reject) => {
    http.get(`http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic=EJdict&Item=${id}&Loc=&Prof=XHTML`, (response) => {
      var xml = '';
      response.on('data', (chunk) => {
        xml += chunk;
      });
      response.on('end', () => {
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          }
          const def = result.GetDicItemResult.Body[0].div[0].div[0].split('\t');
          resolve(def);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  }),
  deleteWord: (req, res) => {
    console.log('in delete =====');
    Word.findOneAndRemove({ _id: req.body.id })
      .then((info) => {
        res.send({ message: `${info.word}を削除しました。` });
      });
  },
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
};
