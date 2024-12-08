const mongoose = require("mongoose");
const genToken = require("../helpers/admin/generateToken");
const userScheme = mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: () => genToken.genToken(20),
    },
    address: String,
    userIdentifier: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userScheme, "users");
module.exports = user;
