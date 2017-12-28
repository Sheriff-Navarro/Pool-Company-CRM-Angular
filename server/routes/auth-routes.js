const express    = require('express');
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const User       = require('../models/user-model');

const router = express.Router();

//--------------------------------------------------------Sign up route
router.post('/api/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const avatarUrl = req.body.avatarUrl;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // const companyName = req.body.companyName;
  // const primaryPhone = req.body.phonePrimary;
  // const street1 = req.body.street;
  // const street2 = req.body.street;
  // const city = req.body.city;
  // const province = req.body.province;
  // const zip = req.body.province;

  //second step of sign up
  if (!username || !password) {
    res.status(400).json({message: 'Provide the email and password.'});
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
      password: hashPass,
      // avatarUrl: avatarUrl,
      // firstName: firstName,
      // lastName: lastName,
      // companyName: companyName,
      // primaryPhone: primaryPhone,
      // street1: street1,
      // street2: street2,
      // city: city,
      // province: province,
      // zip: zip,
    });

    theUser.save((err) => {
      if (err){
        res.status(500).json({message: 'Something went wrong creating your account in the database. User account was not created so please try again.'});
        return;
      }

      req.login(theUser, (err) => { // Logins the user after successful account creation
        if (err){
          res.status(500).json({message: 'Something went wrong at the loging in step. Please try again.'});
          return;
        }
        theUser.password = undefined; // hides user's password from response. Only shows in database.
        res.status(200).json(theUser); // SHows back the user acount info in a server 200 res
      });
    }); // closes theUser.save()
  }); // closes User.findOne()
}); // closes GET /signup

//--------------------------------------------------------Login route
router.post('/api/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, (err, foundUser) => {   // query accounts by username entered

    if (!username || !password ){ // if no username or password is found execute a server 400 res
      res.status(400).json({message: 'Please make sure all required fields are filled out correctly.'});
      return;
    }

    if (!foundUser) { // checks if username exists
      res.status(400).json({message: 'Email entered does not exist in the database. Please try a different email or sign up for a new account.'});
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) { // checks if user's entered password matches the password encrypted with the foundUser
    res.status(400).json({message: 'Incorrect password.'});
    return;
  }

  // log the user in
  req.login(foundUser, (err) => {
    foundUser.password = undefined; // hides the bcrypt password so it doenst return in the response
    // res.status(200).json({message: 'Log in successful!'});
    res.status(200).json(foundUser);
    return;
  });

}); // User.findOne()
});// POST /login

//--------------------------------------------------------Log out route
router.post('/api/logout', (req, res, next) => {
  req.logout(); // this is the function that logsout the user
  res.status(200).json({ message: 'Log out was successful!' });
});

//--------------------------------------------------------Validate user is loged in route
router.get('/api/checklogin', (req, res, next) => { // this function verifies if the user is authenticated or not.
  if (req.isAuthenticated()) { // passing the isAuthenticated function which will verify for us the user is authenticated.
    res.status(200).json({ message: 'You are currently loged in!' });
    return;
  }// Checking if loged in or not

  else // otherwise res serve 403 (forbidden)
    res.status(403).json({ message: 'Unauthorized. Please login.' });
});

//--------------------------------------------------------Add personal details route
// router.put('/api/edit/:id', (req, res) => {
//
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) { // Checks if the user id exists
//     res.status(400).json({ message: 'Specified id is not valid. Try another one.' });
//     return;
//   }
//
//   const update = {
//     firstName : req.body.firstName,
//     lastName : req.body.lastName,
//     // companyName : req.body.companyName,
//     // primaryphone : req.body.primaryPhone,
//     // street1 : req.body.street1,
//     // street2 : req.body.street2,
//     // city : req.body.city,
//     // province : req.body.province,
//     // zip : req.body.zip
//   };
//
//   User.findByIdAndUpdate(req.params.id, update, (err) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     res.json({
//       message: 'User account updated successfully!'
//     });
//   });
// });
//
// //-------------------------------------------------------- Delete account route
// router.delete('/api/delete/:id', (req, res) => {
//   // Checks if user ID is valid in the URL
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid. Try another one.' });
//     return;
//   }
//
//   User.remove({ _id: req.params.id }, (err) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     return res.json({
//       message: 'User has been deleted from the database.'
//     });
//   })
// });

module.exports = router;
