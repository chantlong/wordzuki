const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
// const config = require('./_config');

const port = process.env.PORT || 3000;

const app = express();

// mongoose setup
mongoose.Promise = global.Promise;
process.stdout.write('========== MONGO CONNECt', process.env.PROD_MONGODB);
mongoose.connect(process.env.PROD_MONGODB, (err) => {
  if (err) {
    process.stdout.write(`\ncannot connect to db. ${err}`);
  } else {
    process.stdout.write(`\nconnected to db ${process.env.PROD_MONGODB}`);
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
app.listen(port, () => {
  process.stdout.write(`\nListening on Port${port}`);
});

module.exports = app;
