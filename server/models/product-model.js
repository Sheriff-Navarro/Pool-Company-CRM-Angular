'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  productName: String,
  productDescription: String,
  productImage: String,
  productPrice: Number
});

const User = mongoose.model('Product', productSchema);
module.exports = Product;
