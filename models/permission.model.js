const mongoose = require("mongoose");
const permissionModel = new mongoose.Schema({
  //instance
  title: String,
  value: String,
  status: {
    type: Boolean,
    default: true,
  },
});
const permission = mongoose.model("permission", permissionModel, "permissions");
module.exports = permission;
