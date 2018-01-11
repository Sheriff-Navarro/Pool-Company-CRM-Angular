const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Client = require('../models/client-model');
const router = express.Router();

//GET ALL-----------------------------------------------------------------
router.get('/api/client/all', (req, res, next)=>{
  if (req.isAuthenticated()) {
    Client.find(
      {clientOwner: req.user._id},
      (err, clientList) => {
        if(err){
          res.status(500).json(err);
          return;
        }
        res.status(200).json(clientList);
        console.log(clientList);
      });
    }
    else {
      res.status(403).json({message: "You gotta log in first."});
    }
  });

  //GET ONE-----------------------------------------------------------------
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

  //CREATE------------------------------------------------------------------
  router.post('/api/client/new', (req, res, next) => {
    if (req.isAuthenticated()) {

      const theUser = req.user;

      const theClient = new Client({
        clientOwner : req.user.id,
        clientUsername: req.body.clientUsername,
        clientFirstName: req.body.clientFirstName,
        clientLastName: req.body.clientLastName,
        clientPrimaryPhone: req.body.clientPrimaryPhone,
        clientStreet1: req.body.clientStreet1,
        clientStreet2: req.body.clientStreet2,
        clientCity: req.body.clientCity,
        clientProvince: req.body.clientProvince,
        clientZip: req.body.clientZip,
      });

      theClient.save(function(err) {
        if (!err) {
          theUser.userClients.push(theClient);
          theUser.save();

          const theClientId = theClient._id;
          console.log(theClientId);
          res.status(200).json({ theClientId });
          return;
        }
      });
    }
      else
      res.status(403).json({ message: 'You can\'t do that. Please log in first.' });
  });

  //EDIT--------------------------------------------------------------------
  router.put('/api/client/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    if (req.isAuthenticated()) {
      const clientId = req.params.id;
      const clientToUpdate = {
        clientUsername : req.body.clientUsername,
        clientFirstName : req.body.clientFirstName,
        clientLastName : req.body.clientLastName,
        clientPrimaryPhone : req.body.clientPrimaryPhone,
        clientStreet1 : req.body.clientStreet1,
        clientStreet2 : req.body.clientStreet2,
        clientCity : req.body.clientCity,
        clientProvince : req.body.clientProvince,
        clientZip: req.body.clientZip
      };

      Client.findByIdAndUpdate(clientId, clientToUpdate, (err) => {
        if (err) {
          res.json({message: 'Please fill out all fields before saving.'});
          return;
        }

        res.json({message: 'Client updated successfully'});
      });
    }
    else {// otherwise res serve 403 (forbidden)
      res.status(403).json({ message: 'Unauthorized. Please login.' });
      return;
    }
  });

  //DELETE------------------------------------------------------------------
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
    else
    res.status(403).json({ message: 'You can\'t do that. Please log in first.' });
  });

  module.exports = router;
