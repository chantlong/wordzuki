const passport = require('passport');
const User = require('../models/User');

module.exports = {
  createAccount: (req, res) => {
    User.register(new User({ username: req.body.username }),
      req.body.password, (err) => {
        if (err) {
          return res.status(400).json(err);
        }
        return passport.authenticate('local')(req, res, (err2) => {
          if (err2) {
            return res.status(400).json(err2);
          }
          return res.redirect('/');
        });
      });
  },
  signIn: (req, res, next) => {
    res.status(200).json(req.user.username);
    next();
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
};
