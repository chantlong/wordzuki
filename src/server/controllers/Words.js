const Word = require('../models/Word');
const objectid = require('objectid');
const parseString = require('xml2js').parseString;
const http = require('http');

module.exports = {
  saveWord: (req, res) => {
    const newWord = Word({
      _id: objectid(),
      userId: req.body.userId,
      word: req.body.word,
      pron: req.body.pron,
      examples: [req.body.examples],
      source: req.body.source,
    },
{ timestamps: true });
    newWord.save((err) => {
      if (err) {
        res.json({ ERROR: err });
      } else {
        res.json({ SUCCESS: newWord });
      }
    });
  },
  searchWord: (req, res) => {
    const term = req.body.word;
    const parseXMLAsyncID = new Promise((resolve, reject) => {
      module.exports.parseXMLID(term, resolve, reject);
    });
    parseXMLAsyncID.then((id) => {
      const parseXMLDefAsync = new Promise((resolve, reject) => {
        module.exports.parseXMLDef(id, resolve, reject);
      });
      parseXMLDefAsync.then((result) => {
        if (result) {
          res.json({ SUCCESS: result });
        } else {
          res.json({ ERROR: 'CANNOT BE DEFINED' });
        }
      });
    });
  },
  parseXMLID: (term, resolve, reject) => {
    http.get(`http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=${term}&Scope=HEADWORD&Match=EXACT&Merge=AND&&PageSize=5&PageIndex=0&Prof=XHTML`, (response) => {
      let xml = '';
      response.on('data', (chunk) => {
        xml += chunk;
      });
      response.on('end', () => {
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          }
          const termID = result.SearchDicItemResult.TitleList[0].DicItemTitle[0].ItemID[0];
          resolve(termID);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
    });
  },
  parseXMLDef: (id, resolve, reject) => {
    http.get(`http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic=EJdict&Item=${id}&Loc=&Prof=XHTML`, (response) => {
      let xml = '';
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
  },
};
