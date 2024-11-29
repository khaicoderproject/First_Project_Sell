const productModel = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await productModel.find({ deleted: false });
  res.render("client/pages/dashboard/index", {
    products: products,
  });
};
