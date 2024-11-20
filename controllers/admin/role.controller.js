const roleModel = require("../../models/role.model");
const prefixAdminConfig = require("../../config/prefixAdmin.config");
const prefixAdmin = prefixAdminConfig.prefixAdmin;
module.exports.index = async (req, res) => {
  const role = await roleModel.find();
  res.render("admin/pages/role/index", {
    role: role,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/role/create");
};
module.exports.createPost = async (req, res) => {
  const role = new roleModel(req.body);
  await role.save();
  res.redirect(`${prefixAdmin}/role`);
};
