const express = require('express');
const path = require('path');
const passport = require('passport');
const Users = require('./controllers/Users');
const Words = require('./controllers/Words');

const router = new express.Router();

// words
router.get('/api/word', Words.fetchWords);
router.post('/api/word', Words.saveWord);
router.post('/api/search', Words.searchWord);

// users
router.post('/api/create-account', Users.createAccount);
router.post('/api/auth/sign-in', passport.authenticate('local'), Users.signIn);
router.get('/api/auth/sign-out', Users.signOut);
router.get('/api/auth/is-authorized', Users.isAuthorized);

// home
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});

module.exports = router;
