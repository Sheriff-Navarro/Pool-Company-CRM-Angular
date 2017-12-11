const passport = require('passport');
const User = require('../models/user-model');

// const bcrypt = require('bcrypt');

//Serialize: saves only the ID of the user document in the session
passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

//Retrieve the full user details from the the database using the ID.
// (The user is stored in the session)
passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});
