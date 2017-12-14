const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  // required signup details
  username: {type: String, require: true},
  password: {type: String, require: true},
  // user personal info
  firstName: String,
  lastName: String,
  phonePrimary: Number,
  street: String,
  city: String,
  province: String

// },
//
// clientSchema = {
//
//   clientFname: String,
//   clientLname: String,
//   clientPhonePrimary: Number,
//   clientStreet: String,
//   clientCity: String,
//   clientprovince: String,
//   //Client portal info
//   // clientUsername: String,
//   // clientPassword: String
//
//   chemestryLevel: [{
//
//     phlevel: Number,
//     acidLevel: Number,
//     chlorineLevel: Number,
//     alkalinityLevel: Number,
//     calciumlevel: Number
//
//   }]
//
// }, {
//
//   timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
