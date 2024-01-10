const express = require('express');
const app = express();
 const Category = require("../models/CategoryModel");
 const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
// Update the route logic
app.post('/newcat', async (req, res) => {
  try {
    // Find the maximum key value in the existing categories
    const maxKeyDocument = await Category.findOne().sort({ key: -1 }).select('key');
const minKeyDocument = await Category.findOne().sort({ key: 1 }).select('key');

// Extract the key values or default to 0 if documents are null
const maxKey = maxKeyDocument ? maxKeyDocument.key : 0;
const minKey = minKeyDocument ? minKeyDocument.key : 0;

// Function to find a unique key between the min and max keys
const findUniqueKey = async (min, max) => {
  for (let i = min + 1; i <= max; i++) {
    const existingCategory = await Category.findOne({ key: i });
    if (!existingCategory) {
      return i;
    }
  }
  return null;
};

// Generate a new key by finding a unique key between the min and max keys or use maxKey + 1
const newKey = await findUniqueKey(minKey, maxKey) || maxKey + 1;
    const category = new Category({
      key: newKey,
      category: req.body.category,
      products: req.body.products,
    });

    const categorySaved = await category.save();

    return res.status(200).json({ message: 'Product category insertion successful', categorySaved });
  } catch (error) {
    console.error('Error inserting category:', error);
    res.status(500).json({ error: 'Internal Server Error while inserting the category' });
  }
});




module.exports = app;
