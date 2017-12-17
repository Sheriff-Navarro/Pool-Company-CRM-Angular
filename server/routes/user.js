const express    = require('express');
const User = require('../models/user-model');
const { ensureLoggedIn } = require('connect-ensure-login');
const mongoose = require('mongoose');


const router = express.Router();
//-------------------------------------------------------- Edit admin route
router.put('/edit/:id', ensureLoggedIn(), (req, res) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const update = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    companyName : req.body.companyName,
    phonePrimary : req.body.phonePrimary,
    street : req.body.street,
    city : req.body.city,
    province : req.body.province,
  };

  User.findByIdAndUpdate(req.params.id, update, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Admin updated successfully'
    });
  });
});

//-------------------------------------------------------- Delete admin route
router.delete('/delete/:id', ensureLoggedIn (), (req, res) => {
  // Checks if user ID is valid in the URL
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'User has been Deleted'
    });
  })
});


module.exports = router;
