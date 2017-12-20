'use strict';
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({

  owner: { type: Schema.Types.ObjectId, ref:"User" },
  firstName: String,
  lastName: String,
  companyName: String,
  phonePrimary: String,
  street: String,
  city: String,
  province: String,
  //Client portal info
  // clientUsername: String,
  // clientPassword: String
}); // closing the client

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
