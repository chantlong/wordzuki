const express = require('express');
const path = require('path');
const Users = require('./controllers/Users');
const Words = require('./controllers/Words');

const router = new express.Router();

// words
router.get('/api/word', Users.checkAuthorized, Words.fetchWords);
router.post('/api/word', Users.checkAuthorized, Words.saveWord);
router.delete('/api/word/:id', Users.checkAuthorized, Words.deleteWord);
// router.post('/api/image', Words.readImage);

// users
router.post('/api/auth/sign-up', Users.createAccount);
router.post('/api/auth/sign-in', Users.signIn);
router.get('/api/auth/sign-out', Users.signOut);
router.get('/api/auth/is-authorized', Users.isAuthorized);

// home
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});

module.exports = router;
