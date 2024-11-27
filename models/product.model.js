const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  quantity: Number,
  stock: Number,
  thumnail: String,
  status: String,
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
