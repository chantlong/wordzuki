const express = require('express');
const path = require('path');
const Words = require('./controllers/Words');

const router = new express.Router();

router.get('/api/word', Words.fetchWords);
router.post('/api/word', Words.saveWord);
router.post('/api/search', Words.searchWord);
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});

module.exports = router;
