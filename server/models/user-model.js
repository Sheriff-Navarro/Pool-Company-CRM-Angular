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
  firstName: String,
  lastName: String,
  companyName: String,
  phonePrimary: Number,
  street: String,
  city: String,
  province: String,
  zip: Number,
  clients: [{ type: Schema.Types.ObjectId, 'default':[], ref:'Client' }],
  client: {type: Boolean, default: false} //whether its a client or a user.

}); // closing the userSchema

const User = mongoose.model('User', userSchema);
module.exports = User;

// follow instructions of Phone-store to do CRUD matrix
// if user is going to = to flase otherwise true which is client.
