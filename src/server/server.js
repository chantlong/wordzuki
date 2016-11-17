const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./_config');

const app = express();

// mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.settings.env], (err) => {
  if (err) {
    process.stdout.write(`\ncannot connect to db. ${err}`);
  } else {
    process.stdout.write(`\nconnected to db ${config.mongoURI[app.settings.env]}`);
  }
});

// app uses
app.use(cors({
  origin: '*',
  methods: ['GET, POST, OPTIONS'],
  allowHeaders: 'content-type, accept',
  credentials: true,
  maxAge: 10,
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(routes);
app.listen(3000, () => {
  process.stdout.write('\nListening on Port 3000');
});

module.exports = app;
