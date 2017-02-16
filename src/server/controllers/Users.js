const passport = require('passport');
const User = require('../models/User');
const welcomeMail = require('./Mail').welcomeMail;

module.exports = {
  createAccount: (req, res) => {
    User.findOne({ username: req.body.username })
    .then((match) => {
      if (match) {
        return res.status(400).json({ message: 'ユーザー名は既に存在しています' });
      }
      return User.register(new User({ username: req.body.username }),
      req.body.password, (err) => {
        if (err) {
          return res.status(400).json(err);
        }
        return passport.authenticate('local')(req, res, (err2) => {
          if (err2) {
            return res.status(400).json(err2);
          }
          welcomeMail(req.user.username);
          return res.status(201).json(req.user.username);
        });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },
  signIn: (req, res, next) => {
    passport.authenticate('local', (err, user, errMsg) => {
      if (err) {
        return next(err);
      }
      if (errMsg) {
        return res.status(401).json({ message: errMsg.message });
      }
      return req.logIn(user, (err2) => {
        if (err2) {
          return next(err2);
        }
        return res.status(200).json(user.username);
      });
    })(req, res, next);
  },
  signOut: (req, res) => {
    req.session.destroy();
    req.logOut();
    res.redirect('/');
  },
  isAuthorized: (req, res) => {
    if (req.user) {
      res.status(200).json({ isLoggedIn: true, user: req.user.username });
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  },
  checkAuthorized: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  },
};
