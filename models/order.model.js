const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema cho Cart
const orderSchema = new Schema(
  {
    user_id: { type: String }, // Không có 'required: true' => trường này không bắt buộc
    user_info: {
      fullName: String,
      email: String,
      phone: Number,
      address: String,
    },
    product_info: [
      {
        product_id: { type: String }, // Không có 'required: true' => trường này không bắt buộc
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        total: { type: Number },
      },
    ],
    paymentMethod: String,
    totalPriceAll: Number,
    status: { type: String, default: "active" },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const order = mongoose.model("order", orderSchema, "orders");
module.exports = order;
