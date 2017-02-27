const passport = require('passport');
const User = require('../models/User');
const crypto = require('crypto');
const resetPasswordMail = require('./Mail').resetPasswordMail;

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
  forgotPassword: (req, res) => {
    const generateToken = () => new Promise((resolve, reject) => {
      crypto.randomBytes(17, (err, buf) => {
        if (err) {
          reject(err);
        }
        const token = buf.toString('hex');
        resolve(token);
      });
    });
    const setToken = token => new Promise((resolve, reject) => {
      console.log('that token', token);
      User.findOneAndUpdate({ username: req.body.username }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 })
        .then((updated) => {
          if (!updated) {
            reject('The user does not exist.');
          } else {
            // send reset password mail
            const info = {
              hostname: req.headers.host,
              user: req.body.username,
              token,
            };
            resolve(info);
          }
        });
    });
    generateToken()
      .then(token => setToken(token))
      .then(info => resetPasswordMail(info))
      .then(result => console.log('the result', result))
      .catch(err => res.status(400).send(err));
  },
  resetPassword: (req, res) => {
    console.log('the req params', req.params);
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
      .then((match) => {
        if (!match) {
          res.status(400).send({ message: 'Password reset token is invalid or has expired.' });
        } else {
          res.redirect()
        }
      })
  }
};
