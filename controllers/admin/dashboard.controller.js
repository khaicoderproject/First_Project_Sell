const userModel = require("../../models/user.model");
module.exports.index = async (req, res) => {
  const count = {};
  count.user = await userModel.countDocuments();
  res.render("admin/pages/dashboard/index", {
    count: count,
  });
};
