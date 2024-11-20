const mongoose = require("mongoose");
const roleScheme = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const role = mongoose.model("role", roleScheme, "roles");
module.exports = role;
