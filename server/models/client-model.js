const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({

  clientFirstName: {type: String, default: '(Not Specified)'},
  clientLastName: String,
  clientPrimaryPhone: String,
  clientUsername: String,
  clientStreet1: String,
  clientStreet2: String,
  clientCity: String,
  clientProvince: String,
  clientZip: String,
  clientOwner: { type: Schema.Types.ObjectId, ref:"User" },
  clientService: { type: Schema.Types.ObjectId, ref:'Service' }
}); // closing the client

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
