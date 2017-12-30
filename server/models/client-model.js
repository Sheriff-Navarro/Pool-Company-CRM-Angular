const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({

  clientOwner: { type: Schema.Types.ObjectId, ref:"User" },
  clientFirstName: String,
  clientLastName: String,
  clientCompanyName: String,
  clientPrimaryPhone: String,
  clientStreet1: String,
  clientStreet2: String,
  clientCity: String,
  clientProvince: String,
  clientZip: String,

  //Client portal info
  // clientUsername: String,
  // clientPassword: String

}); // closing the client

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
