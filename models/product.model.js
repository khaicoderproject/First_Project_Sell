const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  quantity: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  formatPrice: String,
  position: Number,
  slugProduct: { type: String, slug: "title", unique: true },
  category_id: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  createBy: String,
  createAt: Date,
  updateBy: String,
  updateAt: Date,
});
const product = mongoose.model("product", productSchema, "products");
module.exports = product;
