const roleModel = require("../../models/role.model");
const permissionModel = require("../../models/permission.model");
module.exports.index = async (req, res) => {
  const role = await roleModel.find();
  res.render("admin/pages/permission/index", {
    role: role,
  });
};
module.exports.create = (req, res) => {
  res.render("admin/pages/permission/create");
};
module.exports.createPost = async (req, res) => {
  const permission = new permissionModel(req.body);
  await permission.save();
  res.render("admin/pages/permission/index");
};
module.exports.edit = async (req, res) => {
  // console.log(req.params);
  const id = req.params.id;
  res.render("admin/pages/permission/edit");
  // res.json("hello");
};
