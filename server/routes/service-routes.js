const express    = require('express');
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const User       = require('../models/user-model');
const Service    = require('../models/service-model');
const Client     = require('../models/client-model');

const router = express.Router();

//GET ALL-----------------------------------------------------------------
router.get('/api/service/all', (req, res, next)=>{
  if (req.isAuthenticated()) {
    Service.find(
      {serviceOwner: req.user.id },
      (err, serviceList) => {
        if(err){
          res.status(500).json(err);
          return;
        }
        res.status(200).json(serviceList);
      });
    }
    else {
      res.status(403).json({message: "Unautherized. Please login first."});
    }
  });

  //CREATE------------------------------------------------------------------
  router.post('/api/service/new/:id', (req, res, next) => {
    const clientId = req.params.id;
    const theUser = req.user;
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    if (req.isAuthenticated()) {
      Client.findById(clientId, (err, foundClient) => {
        if (err) {
          res.json(err);
          return;
        }
        if (foundClient) {
          const theService = new Service({
            serviceOwner: theUser,
            serviceClient: clientId,
            serviceName: req.body.serviceName,
            serviceDescription: req.body.serviceDescription,
            servicePrice: req.body.servicePrice,
          });
          theService.save((err) => {
            if (err) {
              res.json(err);
              return;
            }

            foundClient.clientService = theService;
            foundClient.save((err)=>{
              if (err) {
                res.json(err);
                return;
              }
              res.status(200).json({message: 'Saved to client'})
            });

            theUser.userServices.push(theService);
            theUser.save((err)=>{
              if (err) {
                res.json(err);
                return;
              }
            });

          });
        }
      });
    }
  });
  
  module.exports = router;
