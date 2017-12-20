'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  // user personal info
  IdCustomer: String,
  IdProduct: String,
  orderAmount: Number,
  dateOrdered: Date,
  deliveryDate: Date,
  productPaid: Boolean,
  completedOrder: Boolean

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
