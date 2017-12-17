const express    = require('express');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const User       = require('../models/user-model');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const router = express.Router();

//--------------------------------------------------------Sign up route
router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  //second step of sign up
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const companyName = req.body.companyName;
  const phonePrimary = req.body.phonePrimary;
  const street = req.body.street;
  const city = req.body.city;
  const province = req.body.province;

  if (!username || !password || !email) {
    res.status(400).json({message: 'Provide the email, username and password.'});
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
      email: email,
      username: username,
      password: hashPass,
      //second step of sign up
      firstName : firstName,
      lastName : lastName,
      companyName : companyName,
      phonePrimary : phonePrimary,
      street : street,
      city : city,
      province : province,
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
        theUser.password = undefined; // hides user's password from POST. Only shows in database.
        res.status(200).json(theUser);
      });
    }); // theUser.save()
  }); // User.findOne()
}); // GET /signup

//--------------------------------------------------------Login route
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  // If the username credential is valid
  User.findOne({username: username}, (err, foundUser) => {

    if (!username || !password ){
      res.status(400).json({message: 'Please make sure all login fields are entered'});
      return;
    }

    else if (!foundUser === null){
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

//--------------------------------------------------------Log out route
router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Logout Success' });
});// LOGED OUT

//--------------------------------------------------------Validate user is loged in route
router.get('/validate', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'You are currently loged in' });
    return;
  }// Checking if loged in or not

  res.status(403).json({ message: 'Unauthorized. Please login' });
});

//--------------------------------------------------------Show user app route
router.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'Private message goes here' });
    return;
  } // If loged in, show the secret info. Otherwise show unauthorized

  res.status(403).json({ message: 'Unauthorized. Please login' });
});

module.exports = router;
