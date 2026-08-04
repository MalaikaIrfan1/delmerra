const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number }, // optional — agar sale price ho to "was" price ke sath dikhega
  images: [{ type: String, required: true }], // Cloudinary URLs yahan aayenge
  category: { type: String, required: true },
  variants: [{
    name: String,   // e.g. "Finish"
    options: [String] // e.g. ["Natural", "Dark Walnut"]
  }],
  stock: { type: Number, required: true, default: 0 },
  tag: { type: String }, // "New", "Bestseller", waghera
  careInstructions: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);