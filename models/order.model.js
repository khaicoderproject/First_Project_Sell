const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema cho Cart
const CartSchema = new Schema(
  {
    user_id: { type: String }, // Không có 'required: true' => trường này không bắt buộc
    items: [
      {
        product_id: { type: String }, // Không có 'required: true' => trường này không bắt buộc
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        total: { type: Number },
      },
    ],
    total_price: { type: Number },
    status: { type: String, default: "active" },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
