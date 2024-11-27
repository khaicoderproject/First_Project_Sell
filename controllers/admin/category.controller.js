const categoryModel = require("../../models/category.model");
const prefixAdminConfig = require("../../config/prefixAdmin.config");
module.exports.index = async (req, res) => {
  const category = await categoryModel.find({ deleted: false });
  res.render("admin/pages/category/index", {
    category: category,
  });
};
module.exports.create = (req, res) => {
  res.render("admin/pages/category/create");
};
module.exports.createPost = async (req, res) => {
  const category = new categoryModel(req.body);
  await category.save();
  res.redirect(`${prefixAdminConfig.prefixAdmin}/category`);
};
