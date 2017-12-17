const express    = require('express');
const User = require('../models/user-model');
const { ensureLoggedIn } = require('connect-ensure-login');
const mongoose = require('mongoose');

const router = express.Router();
//--------------------------------------------------------Sign up route
router.post('/:id', (req, res, next) => {
  //second step of sign up
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const companyName = req.body.companyName;
  const phonePrimary = req.body.phonePrimary;
  const street = req.body.street;
  const city = req.body.city;
  const province = req.body.province;

    const theClient = new User({
      firstName : clientInfo.firstName,
      lastName : clientInfo.lastName,
      companyName : clientInfo.companyName,
      phonePrimary : clientInfo.phonePrimary,
      street : clientInfo.street,
      city : clientInfo.city,
      province : clientInfo.province,
    });

    theClient.save((err) => {
      if (err){
        res.status(500).json({message: 'Something went wrong creating your account in the database. User account was not created.'});
        return;
      }

      req.login(theUser, (err) => {
        if (err){
          res.status(500).json({message: 'Something went wrong at loging in step. Please try again.'});
          return;
        }
        theClient.password = undefined; // hides user's password from POST. Only shows in database.
        res.status(200).json(theClient);
      });
    });
  });
});

module.exports = router;
