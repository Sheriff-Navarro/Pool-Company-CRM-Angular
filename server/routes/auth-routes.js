const express    = require('express');
const passport   = require('passport');
const bcrypt     = require('bcrypt');

// Our user model
const User       = require('../models/user-model');
// Enter code here ------->

// <-------------------------SIGN UP
authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    });

    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }

        res.status(200).json(req.user);
      });
      }
    });
  });
});

// <-------------------------LOG IN
authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

// <-------------------------LOG OUT
authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});


// <-------------------------LOGGED IN CHECK
authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

// <-------------------------PRIVATEAPP
authRoutes.get('/admin-app', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});



// EXPORTING!
// const authRoutes = express.Router()
module.exports = authRoutes;
