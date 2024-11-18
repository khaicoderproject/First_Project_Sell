const mongoose = require("mongoose");
const genToken = require("../helpers/admin/generateToken");
const accountScheme = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: {
    type: String,
    default: () => genToken.genToken(20),
  },
  role_id: String,
  status: String,
});
const account = mongoose.model("account", accountScheme, "accounts");
module.exports = account;
