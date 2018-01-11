const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const serviceSchema = new Schema({
  serviceOwner: { type: Schema.Types.ObjectId, ref:'Client' },
  serviceName: {type: String, default: '(Not Specified)'},
  serviceDescription: String,
  servicePrice: Number
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
