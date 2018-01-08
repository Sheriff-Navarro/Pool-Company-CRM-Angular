const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Client = require('../models/client-model');
const router = express.Router();

//--------------------------------------------------------
router.get('/api/all-clients', (req, res, next)=>{
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

  //--------------------------------------------------------
  router.get('/api/client/:id', (req, res, next)=>{
    console.log('function started');
    const clientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      res.status(400)
      .json({ message: 'Specified id is not valid' });
      return;
    }

    console.log('user id valid');

     if (req.isAuthenticated()) {
       console.log('is Authenticated');

       Client.findById(clientId, function (err, foundClient) {
         if (err){
           console.log('error found');
           res.json(err);
           return;
         }
         console.log("Client found in database: ", foundClient);
         res.status(200).json(foundClient);
        });
      }
      else
        res.status(403).json({message: "You gotta log in first."});
    });

    //--------------------------------------------------------
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

          const theClientId = theClient._id;
          console.log(theClientId);
          res.status(200).json({ theClientId });
          return;

        }
        else if (error){
          res.status(500).json({ message: 'Something went wrong. Nothing was saved.' });
          return;
        }
      });
    }
  });

  //--------------------------------------------------------
  router.delete('/api/client/:id', (req, res) => {
    const clientId = req.params.id
    var theUser = req.user

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400)
      .json({ message: 'Specified id is not valid' });
      return;
    }

    if (req.isAuthenticated()) {
      console.log('auth');

      theUser.userClients.forEach((userClient, index) => {
        console.log('ClientId', clientId);
        console.log('User client is', userClient);
        console.log('removing from userClients array started for ', userClient);

        if (userClient == clientId){
          theUser.userClients.splice(index, 1);
          console.log('removed from user');

          theUser.save((err)=>{
            console.log('database saved changes');

            if(err){
              res.json(err);
              return;
            }
          });
        }
      });

      Client.findByIdAndRemove(clientId, (err) => {
        if (err) {
          res.json({message: 'Something went wrong. Please Try again.'});
          return;
        }

        res.json({message: 'Client Deleted!'});
      });
    }
    else // otherwise res serve 403 (forbidden)
    res.status(403).json({ message: 'You can\'t do that. Please log in first.' });
  });
  //--------------------------------------------------------


  module.exports = router;
