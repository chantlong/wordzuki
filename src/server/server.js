const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes');
const config = require('./_config');
const passportSetup = require('./passportSetup');

const port = process.env.PORT || 3000;

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

passportSetup();
// session setup


// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1);
//   sess.cookie.secure = true;
// }
// app uses
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(cors({
  origin: '*',
  methods: ['GET, POST, OPTIONS'],
  allowHeaders: 'content-type, accept',
  credentials: true,
  maxAge: 10,
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sess = {
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
  }),
  resave: false,
  secret: 'rolling squirrel',
  saveUninitialized: false,
  cookie: { secure: false },
};

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.listen(port, () => {
  process.stdout.write(`\nListening on Port${port}`);
});

module.exports = app;
