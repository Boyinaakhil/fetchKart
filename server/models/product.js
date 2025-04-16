const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number,
}, {
  timestamps: true,
});

// ✅ Fix: properly export the model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
