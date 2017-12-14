const express    = require('express');
const bcrypt     = require('bcrypt');
const User = require('../models/user-model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({message: 'Provide the username and password.'});
    return;
  }

  // See if the user is already taken (query the database)
  User.findOne({ username: username }, '_id', (err, foundUser) => {
    if (foundUser){
      res.status(400).json({message: 'The username already exists. Try another one.'});
      return;
      }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const theUser = new User({
      username: username,
      password: hashPass
      });

    theUser.save((err) => {
      if (err){
        res.status(500).json({message: 'Something went wrong creating your account in the database. User account was not created.'});
        return;
      }

      req.login(theUser, (err) => {
        if (err){
          res.status(500).json({message: 'Something went wrong at loging in step. Please try again.'});
          return;
        }

        // theUser.password = undefined; // Does not hide the user's password in mongo. Needs to do this for security reasons. Ask Alan.
        res.status(200).json(theUser);
      });
    }); // theUser.save()
  }); // User.findOne()
}); // GET /signup


router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  // If the username credential is valid
  User.findOne({username: username}, (err, foundUser) => {

    if (!foundUser === null){
      res.status(400).json({message: 'Incorrect username'});
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      res.status(400).json({message: 'Incorrect password'});
      return;
    }

    // If we get herer we are good!
    // log the user in
    req.login(foundUser, (err) => {
      foundUser.password = undefined;
      res.status(200).json(foundUser);
      return;
    });
  }); // User.findOne()
});// POST /login

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Logout Success' });
});// LOGED OUT

router.get('/account', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }// Checking if loged in or not

  res.status(403).json({ message: 'Unauthorized. Please login' });
});

router.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'You are now loged in and can use the app' });
    return;
  } // If loged in, show the secret info. Otherwise show unauthorized

  res.status(403).json({ message: 'Unauthorized. Please login' });
});

module.exports = router;
