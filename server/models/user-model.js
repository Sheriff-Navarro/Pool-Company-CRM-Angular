const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phonePrimary: Number,
  street: String,
  city: String,
  province: String

}, clientSchema: {

  clientFname: String,
  clientLname: String,
  clientPhonePrimary: Number,
  clientStreet: String,
  clientCity: String,
  clientprovince: String,
  //Client portal info
  // clientUsername: String,
  // clientPassword: String

  chemestryLevels: {

    phlevel: Number,
    acidLevel: Number,
    chlorineLevel: Number,
    alkalinityLevel: Number,
    calciumlevel: Number

    {
      clientTimetamps: {
        clientCreatedAt: 'client_created_at',
        clientUpdatedAt: 'client_updated_at'
      }
    }

  }
}, {

  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
