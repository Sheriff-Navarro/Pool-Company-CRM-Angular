const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({

  clientOwner: { type: Schema.Types.ObjectId, ref:"User" },
  clientFirstName: {type: String, default: '(Not Specified)'},
  clientLastName: String,
  clientPrimaryPhone: String,
  clientUsername: String,
  // clientCompanyName: String,
  clientStreet1: String,
  clientStreet2: String,
  clientCity: String,
  clientProvince: String,
  clientZip: String,
  clientService: [{ type: Schema.Types.ObjectId, 'default':[], ref:'Service' }],

  //Client portal info
  // clientPassword: String

}); // closing the client

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
