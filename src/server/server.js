const express = require('express');
const path = require('path');
const url = require('url');
const favicon = require('serve-favicon');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
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

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1);
//   sess.cookie.secure = true;
// }
// app uses
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')));
app.use(cors({
  origin: '*',
  methods: ['GET, POST, OPTIONS, DELETE'],
  allowHeaders: 'content-type, accept',
  credentials: true,
  maxAge: 10,
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));

let sess;

if (process.env.REDISTOGO_URL) {
  const redisUrl = url.parse(process.env.REDISTOGO_URL);
  const rStore = redis.createClient(redisUrl.port, redisUrl.hostname);
  rStore.auth(redisUrl.auth.split(':')[1]);

  sess = {
    store: new RedisStore({
      client: rStore,
    }),
    resave: false,
    secret: 'flying squirrel',
    saveUninitialized: false,
  };
} else {
  sess = {
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
    }),
    resave: false,
    secret: 'rolling squirrel',
    saveUninitialized: false,
    cookie: { secure: false },
  };
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.listen(port, () => {
  process.stdout.write(`\nListening on Port${port}`);
});

module.exports = app;
