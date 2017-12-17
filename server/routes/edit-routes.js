const express    = require('express');
const User = require('../models/user-model');

const router = express.Router();

// router.get('/app', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.status(200).json(req.user);
//     return;
//   }// Checking if loged in or not
//
//   res.status(403).json({ message: 'Unauthorized. Please login' });


router.put('/edit-admin', (req, res, next) => {

});

module.exports = router;
