const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const router = express.Router();

router.get('/api/user', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
});

//-------------------------------------------------------- Edit admin route
router.put('/api/user/edit', (req, res) => {
  if (req.isAuthenticated()) {
    const update = {
      // avatarUrl : req.body.avatarUrl,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      companyName : req.body.companyName,
      primaryPhone : req.body.primaryPhone,
      street1 : req.body.street1,
      street2 : req.body.street2,
      city : req.body.city,
      province : req.body.province,
      zip: req.body.zip,
    };

    User.findByIdAndUpdate(req.user.id, update, (err) => {
      if (err) {
        res.json({message: 'Please fill out all fields before saving.'});
        return;
      }

      res.json({message: 'Admin updated successfully'});
    });
  }
  else
  res.status(403).json({ message: 'Unauthorized. Please login.' });
});

//--------------------------------------------------------
router.delete('/api/user/delete', (req, res) => {
  if (req.isAuthenticated()) {

    User.findByIdAndRemove(req.user.id, (err) => {
      if (err) {
        res.json({message: 'Something went wrong. Please Try again.'});
        return;
      }

      res.json({message: 'Account Deleted!'});
    });
  }
  else
  res.status(403).json({ message: 'You can\'t do that. Please log in first.' });
});

module.exports = router;
