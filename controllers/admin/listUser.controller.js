const userModel = require("../../models/user.model");
module.exports.list = async (req, res) => {
  const user = await userModel.find();
  res.render("admin/pages/list-user/list", {
    user: user,
  });
};
