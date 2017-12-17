'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  // required signup details
  email: {type: String, required: true, unique: true, lowercase: true},
  username: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  // user personal info
  firstName: String,
  lastName: String,
  companyName: String,
  phonePrimary: String,
  street: String,
  city: String,
  province: String,


  clientInfo : [{

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

    chemestryLevel: [{

      ph: String,
      acid: String,
      chlorine: String,
      alkalinity: String,
      calcium: String,

    }]

  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
