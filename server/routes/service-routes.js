const express    = require('express');
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const User       = require('../models/user-model');
const Service       = require('../models/service-model');
const Client       = require('../models/client-model');

const router = express.Router();

//GET ALL-----------------------------------------------------------------
router.get('/api/service/all', (req, res, next)=>{
  console.log('starting...');
  if (req.isAuthenticated()) {
    console.log('authenticated. Getting all service..');
    Service.find(
      // {serviceOwner: req.params.id },
      (err, serviceList) => {
        console.log('servicelist is: ', serviceList);
        console.log('err is: ', err);
        if(err){
          console.log(err);
          res.status(500).json(err);
          return;
        }
        console.log('found services: ', serviceList);
        res.status(200).json(serviceList);
      });
    }
    else {
      console.log('not authenticated');
      res.status(403).json({message: "Unautherized. Please login first."});
    }
  });

  //CREATE------------------------------------------------------------------
  router.post('/api/service/new/:id', (req, res, next) => {
    console.log("starting...");
    const ClientId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(ClientId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    if (req.isAuthenticated()) {
      console.log('authenticated');
      Client.findById(ClientId, (err, foundClient) => {
        console.log("I found ", foundClient);
        console.log("I found ", err);
        if (err) {
          res.json(err);
          return;
        }
        if (foundClient) {
          const theservice = new Service({
            serviceOwner: ClientId,
            serviceName: req.body.serviceName,
            serviceDescription: req.body.serviceDescription,
            servicePrice: req.body.servicePrice,
          });
          theservice.save((err) => {
            if (err) {
              res.json(err);
              return;
            }

            foundClient.clientService.push(theservice);
            foundClient.save((err)=>{
              if (err) {
                res.json(err);
                return;
              }
              res.status(200).json({message: 'saved'})
            });

          });
          // if (!err){
          // return;
        }
      });
    }
  });
  // const theservice = new Service({
  //   serviceOwner: ClientId,
  //   serviceName: req.body.serviceName,
  //   serviceDescription: req.body.serviceDescription,
  //   servicePrice: req.body.servicePrice,
  // });

  // console.log("created new service model");
  //
  // theservice.save((err) => {
  //   console.log("starting saving function...");
  //   if (err){
  //     res.status(500).json({ message: 'Something went wrong. Nothing was saved.' });
  //     return;
  //     console.log("failed saving.");
  //   }
  //   const theserviceId = theservice._id;
  //   res.status(200).json({ theserviceId });
  //   console.log("success", theserviceId);

  // Save chem to client
  // console.log("starting to save service into client...");
  // Client.findById(ClientId, (err, foundClient) => {
  // if (err) {
  //   return;
  // }
  // console.log('the client id is:',ClientId);
  // console.log('the found client id is:',foundClient);

  // console.log('foundddd', foundClient);
  // if (!err){
  //   foundClient.clientService.push(theserviceId);
  //   foundClient.save();
  //   return;
  // }
  // else {
  //   console.log("authetication failed");
  //   res.json({message: "you're not loged in."});
  // }

  module.exports = router;
