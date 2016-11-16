const express = require('express');
const Words = require('./controllers/Words');

const router = new express.Router();

router.get('*', (req, res) => {
  res.send('<h1>wordzuki!</h1>');
});
router.post('/word', Words.saveWord);
router.post('/search', Words.searchWord);

module.exports = router;
