const express = require('express');
const path = require('path');
const multer = require('multer');

const Users = require('./controllers/Users');
const Words = require('./controllers/Words');
const KVBImporter = require('./controllers/KVBImporter');

const upload = multer({ dest: path.resolve('./src/server/uploads/') });

const router = new express.Router();

// words
router.get('/api/word', Words.fetchWords);
router.post('/api/word', Users.checkAuthorized, Words.saveWord);

router.delete('/api/word/:id', Users.checkAuthorized, Words.deleteWord);
// router.post('/api/search', Users.checkAuthorized, Words.searchWord);
// router.post('/api/image', Words.readImage);

// kvb importer
router.post('/api/kvb/', upload.single('kindlevb'), KVBImporter.readKVB);

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
