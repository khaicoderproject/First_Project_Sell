const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const category = await categoryModel.find({ deleted: false });
  const products = await productModel.find({ deleted: false });
  res.render("client/pages/dashboard/index", {
    category: category,
    products: products,
  });
};
