const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const categorySchema = new Schema({
  key: {
    type: Number,
    unique: true,
  },
  category: String,
  products: Number,
});

module.exports = mongoose.model('categories', categorySchema);
