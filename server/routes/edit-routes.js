const express    = require('express');
const bcrypt     = require('bcrypt');
const User = require('../models/user-model');

const router = express.Router();

// router.get('/app', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.status(200).json(req.user);
//     return;
//   }// Checking if loged in or not
//
//   res.status(403).json({ message: 'Unauthorized. Please login' });


  router.post('/edit', (req, res, next) => {

    res.status(200).json({ message: 'viewing the admin edit page' });

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phonePrimary = req.body.phonePrimary;
    const street = req.body.street;
    const city = req.body.city;
    const province = req.body.province;

    theUser.save((err) => {
      if (err){
        res.status(500).json({message: 'Something went wrong adding your personal info in the data base but the username and password was created successfully in the previous step. Please refresh the page and try again.'});
        return;
      }
    });
  });

  module.exports = router;
