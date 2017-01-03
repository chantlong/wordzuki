const fs = require('fs');
const path = require('path');

module.exports = {
  loadE2JDict: () => {
    return new Promise((resolve, reject) => {
      const dictUrl = path.resolve('./src/server/dict/ejdic-hand-utf8.txt');
      fs.readFile(dictUrl, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        const dict = {};
        const entries = data.split('\n');
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i].split('\t ');
          if (entry[0].indexOf(',') > -1) {
            const similarEntries = entry[0].split(',');
            for (let j = 0; j < similarEntries.length; j += 1) {
              dict[similarEntries[j].toLowerCase().trim()] = entry[1];
            }
          } else {
            dict[entry[0].toLowerCase().trim()] = entry[1];
          }
        }
        console.log('loaded', dict);
        resolve(dict);
      });
    });
  },
  searchE2J: (word, dict) => {
    if (dict[word]) {
      const result = dict[word].trim().split(' / ');
      if (result[0] === '=') {
        const referredWord = result.slice(1);
        module.exports.searchE2J(referredWord);
      }
      return result;
    }
    return null;
  },
};
