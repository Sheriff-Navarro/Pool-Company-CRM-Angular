'use strict';
const Client = require('./client-model');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const userSchema = new Schema({
  // required signup details
  // email: {type: String, unique: true, lowercase: true},
  username: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  // user personal info
  userDetails: {
    firstName: String,
    lastName: String,
    companyName: String,
    primaryPhone: Number,
    street1: String,
    street2: String,
    city: String,
    province: String,
    zip: Number,
  },//whether its a client or a user.
  avatarUrl:{
    type: String,
    required: false,
    default: "http://laoblogger.com/images/default-profile-picture-5.jpg"
  },
  isClient: {type: Boolean, default: false},
  userClients: [{ type: Schema.Types.ObjectId, 'default':[], ref:'Client' }],

}); // closing the userSchema

const User = mongoose.model('User', userSchema);
module.exports = User;

// follow instructions of Phone-store to do CRUD matrix
// if user is going to = to flase otherwise true which is client.
