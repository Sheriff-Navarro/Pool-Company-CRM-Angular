const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Client = require('../models/client-model');
const router = express.Router();

// router.get('/api/get-clients', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     const theUserId = req.user.id;
//     clients.find({clientOwner: theUserId }).
//     // sort({ "clientLastName": 1 })
//     res.status(200).json({clients});
//
//     // populate('clientOwner').
//     // exec(function (err, clientlist) {
//     //   if (err) return handleError(err);
//     //   res.status(200).json({clientlist});
//     //   return;
//     // });
//   }
// });

router.get('/api/get-clients', (req, res, next)=>{
  if (req.isAuthenticated()) {
    Client.find(
      {clientOwner: req.user._id},
      (err, clientList) => {
        if(err){
          res.status(500).json(err);
          return;
        }
        res.status(200).json(clientList);
      });
    }
    else {
      res.status(403).json({message: "You gotta log in first."});
    }
  });



router.post('/api/new-client', (req, res, next) => {
  const clientFirstName = req.body.clientFirstName;
  const clientOwner = req.user.id;
  const clientLastName = req.body.clientLastName;
  // const clientCompanyName = req.body.clientCompanyName;
  const clientUsername = req.body.clientUsername;
  const clientPrimaryPhone = req.body.clientPrimaryPhone;
  const clientStreet1 = req.body.clientStreet1;
  const clientStreet2 = req.body.clientStreet2;
  const clientCity = req.body.clientCity;
  const clientProvince = req.body.clientProvince;
  const clientZip = req.body.clientZip;

  if (req.isAuthenticated()) {
    const theUser = req.user;

    const theClient = new Client({
      clientFirstName: clientFirstName,
      clientOwner : clientOwner,
      clientLastName: clientLastName,
      clientPrimaryPhone: clientPrimaryPhone,
      clientUsername: clientUsername,
      // clientCompanyName: clientCompanyName,
      clientStreet1: clientStreet1,
      clientStreet2: clientStreet2,
      clientCity: clientCity,
      clientProvince: clientProvince,
      clientZip: clientZip,
    });

    theClient.save(function(error) {
      if (!error) {
        theUser.userClients.push(theClient);
        theUser.save();

        res.status(200).json({ message: 'Success! Client saved.' });
        return;

      }
      else if (error){
        res.status(500).json({ message: 'Something went wrong. Nothing was saved.' });
        return;
      }
    });
  }
});

module.exports = router;
