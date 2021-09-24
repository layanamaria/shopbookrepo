// models/Book.js

const mongoose = require('mongoose');

require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;


const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  price: {
  type: SchemaTypes.Double,
  required: true
  },
  available: {
    type:Number,
    required: true
  },
 image: {
      type: String,
      required: true
 },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model('book', BookSchema);