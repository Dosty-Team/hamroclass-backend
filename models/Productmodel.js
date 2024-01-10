const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  description: String,
  qty: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturer: String,
  inStock: {
    type: Boolean,
    default: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  // Add more attributes as needed
});

module.exports = mongoose.model("Products", productSchema);
