const productModel = require("../../models/product.model");
const prefixAdminConfig = require("../../config/prefixAdmin.config");
const prefixAdmin = prefixAdminConfig.prefixAdmin;
const categoryModel = require("../../models/category.model");
module.exports.index = async (req, res) => {
  const product = await productModel.find({ deleted: false, status: "active" });
  // console.log(product);
  res.render("admin/pages/product/index", { product: product });
};
module.exports.create = async (req, res) => {
  const category = await categoryModel.find({ deleted: false });
  res.render("admin/pages/product/create", {
    category: category,
  });
};
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  if (req.file) {
    req.body.thumbnail = req.file.filename;
  }
  const product = new productModel(req.body);
  await product.save();
  res.redirect(`${prefixAdmin}/product`);
};
module.exports.update = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findOne({
    _id: id,
    status: "active",
    deleted: false,
  });
  // console.log(product.id);
  res.render("admin/pages/product/update", {
    product: product,
  });
};
module.exports.updatePost = async (req, res) => {
  const id = req.params.id;
  await productModel.updateOne({ _id: id }, req.body);
  res.redirect("back");
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await productModel.updateOne({ _id: id }, { deleted: true });
  res.redirect("back");
};

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const detail = await productModel.findOne({ _id: id });
  // console.log(detail);
  res.render("admin/pages/product/detail", { detail: detail });
};
