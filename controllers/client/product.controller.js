const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
const formatCurrency = require("../../helpers/admin/formatCurrency");
module.exports.detail = async (req, res) => {
  const slugProduct = req.params.slugProduct;
  const product = await productModel
    .findOne({ slugProduct: slugProduct })
    .lean();
  product.price = formatCurrency(product.price);
  // console.log(product);
  // console.log(products);
  res.render("client/pages/product/detail", {
    product,
  });
};
